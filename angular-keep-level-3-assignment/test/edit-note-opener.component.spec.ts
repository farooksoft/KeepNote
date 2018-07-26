import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Router, ActivatedRoute, convertToParamMap } from '@angular/router';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { EditNoteOpenerComponent } from '../src/app/edit-note-opener/edit-note-opener.component';
import { NotesService } from '../src/app/services/notes.service';
import { AuthenticationService } from '../src/app/services/authentication.service';
import { RouterService } from '../src/app/services/router.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {
  FakeTestDialogModule,
  MockRouterService
} from './routes.test';

const testConfig = {
  getNotes: {
    positive: [{
      id: 1,
      title: 'Read Angular 5 blog',
      text: 'Shall do at 6 pm',
      state: 'not-started'
    },
    {
      id: 2,
      title: 'Call Ravi',
      text: 'Track the new submissions',
      state: 'not-started'
    }],
    negative: []
  },
  addNotes: {
    positive: {
      id: 3,
      title: 'Read Angular 5 blog again',
      text: 'Shall do at 7 pm',
      state: 'not-started'
    },
    editNote: {
      id: 1,
      title: 'Read Angular 2 blog',
      text: 'Shall do at 9 pm',
      state: 'not-started'
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


describe('EditNoteOpenerComponent', () => {
  let editNoteOpenercomponent: EditNoteOpenerComponent;
  let fixture: ComponentFixture<EditNoteOpenerComponent>;
  let router: Router;
  let notesService: NotesService;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EditNoteOpenerComponent
      ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        FakeTestDialogModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatAutocompleteModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatMenuModule,
        MatSidenavModule,
        MatToolbarModule,
        MatCardModule,
        MatExpansionModule,
        MatGridListModule,
        MatListModule,
        MatStepperModule,
        MatTabsModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatChipsModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatDialogModule,
        MatSnackBarModule,
        MatTooltipModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        HttpClientModule
      ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: {
          snapshot: {paramMap: convertToParamMap({noteId: '1'})}
        }
        },
        NotesService,
        AuthenticationService,
        { provide: RouterService, useClass: MockRouterService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    notesService = TestBed.get(NotesService);
    notesService.notes = testConfig.getNotes.positive;
    fixture = TestBed.createComponent(EditNoteOpenerComponent);
    editNoteOpenercomponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(editNoteOpenercomponent).toBeTruthy();
  });
});
