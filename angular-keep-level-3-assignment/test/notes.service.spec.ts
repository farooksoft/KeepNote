import { TestBed, inject, fakeAsync } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HttpClient } from '@angular/common/http';
import { Http, XHRBackend, ConnectionBackend, BaseRequestOptions, Response, ResponseOptions, RequestMethod} from '@angular/http';
import { NotesService } from '../src/app/services/notes.service';
import { AuthenticationService } from '../src/app/services/authentication.service';

const testConfig = {
  getNotes: {
    positive: [{
      id: 1,
      title: 'Read Angular 5 blog',
      text: 'Shall do at 6 pm'
    },
    {
      id: 2,
      title: 'Call Ravi',
      text: 'Track the new submissions'
    }],
    negative: []
  },
  addNotes: {
    positive: {
      id: 3,
      title: 'Read Angular 5 blog again',
      text: 'Shall do at 7 pm'
    },
    editNote: {
      id: 1,
      title: 'Read Angular 2 blog',
      text: 'Shall do at 9 pm'
    },
  },
  error404: {
    message: 'Http failure response for http://localhost:3000/api/v1/notes: 404 Not Found',
    name: 'HttpErrorResponse',
    ok: false,
    status : 404,
    statusText: 'Not Found',
    url: 'http://localhost:3000/api/v1/notes'
   },
   requstURL: 'http://localhost:3000/api/v1/notes'
};

describe('NotesService', () => {
  let mockBackend: any;
  let notesService: NotesService;
  let mockResponsePositive: Array <any>;
  let mockResponseNegative: Array <any>;
  let mockResponseError404: any;
  const requestURL: string = testConfig.requstURL;
  let mockAddNoteResponsePositive: any;
  let editNote: any;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
      NotesService,
      AuthenticationService,
      MockBackend,
      BaseRequestOptions,
      {
        provide: HttpClient,
        deps: [MockBackend, BaseRequestOptions],
        useFactory: (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
          return new Http(backend, defaultOptions);
        }
      }
      ]
    });
  });

  beforeEach(() => {
    mockBackend = TestBed.get(MockBackend);
    notesService = TestBed.get(NotesService);
  });

  it('should be created', inject([NotesService], (service: NotesService) => {
    expect(service).toBeTruthy();
  }));

  // ------------ Positive testing of get Notes------------//
  it('should handle getNotes response', fakeAsync(() => {
    mockResponsePositive = testConfig.getNotes.positive;
    mockBackend.connections.subscribe((connection: MockConnection) => {
    expect(connection.request.url).toBe(requestURL, 'requested url should match with server api url');
    expect(connection.request.method).toBe(RequestMethod.Get, 'should handle requested method type.');
    connection.mockRespond(new Response(new ResponseOptions({body: mockResponsePositive, status: 200})));
    });
    notesService.fetchNotesFromServer();
    notesService.getNotes().subscribe((res: any) => {
    expect(res).toBeDefined();
    expect(res._body).toBe(mockResponsePositive, 'should handle to get all notes from server');
    });
  }));

    // ------------ Positive testing of get Notes------------//
  it('should handle getNotes response if there is no notes in database', fakeAsync(() => {
    mockResponseNegative = testConfig.getNotes.negative;
    mockBackend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.url).toBe(requestURL, 'requested url should match with server api url');
      expect(connection.request.method).toBe(RequestMethod.Get, 'should handle requested method type.');
      connection.mockRespond(new Response(new ResponseOptions({body: mockResponseNegative, status: 200})));
    });
    notesService.fetchNotesFromServer();
    notesService.getNotes().subscribe((res: any) => {
      expect(res).toBeDefined();
      expect(res._body.length).toBe(0, 'should check response body length');
    });
  }));

  // ------------ Testing to handle 404 Error of get Notes------------//
  it('should handle 404 error on get notes', fakeAsync(() => {
    mockResponseError404 = testConfig.error404;
    mockBackend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.url).toBe(requestURL, 'requested url should match with server api url');
      expect(connection.request.method).toBe(RequestMethod.Get, 'should handle requested method type.');
      connection.mockError(mockResponseError404);
    });
    notesService.fetchNotesFromServer();
    notesService.getNotes().subscribe((res: any) => {
      expect(res).toBeDefined();
    },
    (err: any) => {
      expect(err).toBeDefined();
      expect(err.status).toBe(404, 'should handle if request url is not found (404 error)');
    });
  }));

  // ------------ Positive testing of addNote------------//
  it('should handle addNote response', fakeAsync(() => {
    mockAddNoteResponsePositive = testConfig.addNotes.positive;
    mockBackend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.url).toBe(requestURL, 'requested url should match with server api url');
      expect(connection.request.method).toBe(RequestMethod.Post, 'should handle requested method type.');
      connection.mockRespond(new Response(new ResponseOptions({body: mockAddNoteResponsePositive, status: 200})));
    });
    notesService.addNote(mockAddNoteResponsePositive).subscribe((res: any) => {
      expect(res).toBeDefined();
      expect(res._body).toBe(mockAddNoteResponsePositive,
        'should handle if newly created note is added successfully by checking response body with mock data');
    });
  }));

    // ------------ Testing to handle 404 Error of add Notes------------//
  it('should handle 404 error on add notes', fakeAsync(() => {
    mockResponseError404 = testConfig.error404;
    mockAddNoteResponsePositive = testConfig.addNotes.positive;
    mockBackend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.url).toBe(requestURL, 'requested url should match with server api url');
      expect(connection.request.method).toBe(RequestMethod.Post, 'should handle requested method type.');
      connection.mockError(mockResponseError404);
    });
    notesService.addNote(mockAddNoteResponsePositive).subscribe((res: any) => {
      expect(res).toBeDefined();
    },
    (err: any) => {
      expect(err).toBeDefined();
      expect(err.status).toBe(404, 'should handle if request url is not found (404 error)');
    });
  }));


  // ------------ Positive testing of editNote------------//
  it('should handle editNote response', fakeAsync(() => {
    mockResponsePositive = testConfig.getNotes.positive;
    editNote = testConfig.addNotes.editNote;
    notesService.notes = mockResponsePositive;
    mockBackend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.url).toBe(requestURL + '/1', 'requested url should match with server api url');
      expect(connection.request.method).toBe(RequestMethod.Put, 'should handle requested method type.');
      connection.mockRespond(editNote);
    });
    notesService.editNote(editNote).subscribe((res: any) => {
      expect(res).toBeDefined();
      expect(res).toBe(editNote,
        'should handle if note is updated successfully by checking response body with mock data');
    });
  }));

    // ------------ Testing to handle 404 Error of edit Notes------------//
  it('should handle 404 error on editNote', fakeAsync(() => {
    editNote = testConfig.addNotes.editNote;
    mockResponseError404 = testConfig.error404;
    mockBackend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.url).toEqual(requestURL + '/1', 'requested url should match with server api url');
      expect(connection.request.method).toBe(RequestMethod.Put, 'should handle requested method type.');
      connection.mockError(mockResponseError404);
    });
    notesService.editNote(editNote).subscribe((res: any) => {
      expect(res).toBeDefined();
    },
    (err: any) => {
      expect(err).toBeDefined();
      expect(err.status).toBe(404, 'should handle if request url is not found (404 error)');
    });
  }));

   // ------------ Testing to handle get a note by id------------//
  it('should get a note by id', () => {
    mockResponsePositive = testConfig.getNotes.positive;
    notesService.notes = mockResponsePositive;
    const note = notesService.getNoteById(1);
    expect(mockResponsePositive[0].title).toBe(note.title, 'should handle to get note by id');
  });



});
