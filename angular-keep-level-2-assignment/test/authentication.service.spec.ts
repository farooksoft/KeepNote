import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Http, XHRBackend, ConnectionBackend, BaseRequestOptions, Response, ResponseOptions, RequestMethod} from '@angular/http';
import { AuthenticationService } from '../src/app/services/authentication.service';

const testConfig = {
  login: {
    username: 'stranger',
    password: 'password'
  },
  error404: {
    message: 'Http failure response for http://localhost:3000/auth/v1: 404 Not Found',
    name: 'HttpErrorResponse',
    ok: false,
    status : 404,
    statusText: 'Not Found',
    url: 'http://localhost:3000/auth/v1'
  },
  error403: {
    error: {message: 'Unauthorized'},
    message: 'Http failure response for http://localhost:3000/auth/v1/: 403 Forbidden',
    name: 'HttpErrorResponse',
    ok: false,
    status: 403,
    statusText: 'Forbidden',
    url: 'http://localhost:3000/auth/v1/'
  },
  positive: {
    token: 'token123'
  },
  requestURL: 'http://localhost:3000/auth/v1/',
  isAuth: {isAuthenticated: true},
  isAuthURL: 'http://localhost:3000/auth/v1/isAuthenticated',
  authError404: {
    message: 'Http failure response for http://localhost:3000/auth/v1/isAuthenticated: 404 Not Found',
    name: 'HttpErrorResponse',
    ok: false,
    status : 404,
    statusText: 'Not Found',
    url: 'http://localhost:3000/auth/v1'
  },
  authError403: {
    error: {message: 'Unauthorized'},
    message: 'Http failure response for http://localhost:3000/auth/v1/isAuthenticated: 403 Forbidden',
    name: 'HttpErrorResponse',
    ok: false,
    status: 403,
    statusText: 'Forbidden',
    url: 'http://localhost:3000/auth/v1/isAuthenticated'
  },
};


describe('AuthenticationService', () => {
  let mockBackend: any;
  let authenticationService: AuthenticationService;
  let mockResponsePositive: any;
  let mockResponseError: any;
  let requestURL: any;
  const loginDetail: any = testConfig.login;
  const token: any = testConfig.positive.token;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
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
    authenticationService = TestBed.get(AuthenticationService);
  });

  it('should be created', inject([AuthenticationService], (service: AuthenticationService) => {
    expect(service).toBeTruthy();
  }));

  // ------------ Positive testing of login user------------//
  it('should handle login user', fakeAsync(() => {
    requestURL = testConfig.requestURL;
    mockResponsePositive = testConfig.positive;
    mockBackend.connections.subscribe((connection: MockConnection) => {
    expect(connection.request.url).toBe(requestURL, 'requested url should match with server api url');
    expect(connection.request.method).toBe(RequestMethod.Post, 'should handle requested method type.');
    connection.mockRespond(new Response(new ResponseOptions({body: mockResponsePositive, status: 200})));
    });
    authenticationService.authenticateUser(loginDetail).subscribe((res: any) => {
    expect(res).toBeDefined();
    expect(res._body).toBe(mockResponsePositive, 'should handle to authenticate user and get token');
    });
  }));

  // ------------ Testing to handle 404 Error of login user------------//
  it('should handle 404 error if login url is not found', fakeAsync(() => {
    requestURL = testConfig.requestURL;
    mockResponseError = testConfig.error404;
    mockBackend.connections.subscribe((connection: MockConnection) => {
    expect(connection.request.url).toBe(requestURL, 'requested url should match with server api url');
    expect(connection.request.method).toBe(RequestMethod.Post, 'should handle requested method type.');
    connection.mockError(mockResponseError);
    });
    authenticationService.authenticateUser(loginDetail).subscribe((res: any) => {
      expect(res).toBeDefined();
    },
    (err: any) => {
      expect(err.status).toBe(mockResponseError.status, 'should handle 404 error if login url does not match');
    });
  }));

  // ------------ Testing to handle 403 Error of login user------------//
  it('should handle if username and password is wrong', fakeAsync(() => {
    requestURL = testConfig.requestURL;
    mockResponseError = testConfig.error403;
    mockBackend.connections.subscribe((connection: MockConnection) => {
    expect(connection.request.url).toBe(requestURL, 'requested url should match with server api url');
    expect(connection.request.method).toBe(RequestMethod.Post, 'should handle requested method type.');
    connection.mockError(mockResponseError);
    });
    authenticationService.authenticateUser(loginDetail).subscribe((res: any) => {
      expect(res).toBeDefined();
    },
    (err: any) => {
      expect(err.status).toBe(mockResponseError.status, 'should handle 403 error if user name and password is wrong');
    });
  }));

  // ------------ Testing to handle to set token in local storage------------//
  it('should handle to set and get jwt token in local storage', fakeAsync(() => {
    mockResponsePositive = testConfig.positive.token;
    authenticationService.setBearerToken(mockResponsePositive);
    tick();
    expect(mockResponsePositive).toBe(authenticationService.getBearerToken(), 'should handle to set and get token from local storage');
  }));


  // ------------ Positive testing of isUserAuthenticated------------//
  it('should handle to know if user is aunthenticated', fakeAsync(() => {
    requestURL = testConfig.isAuthURL;
    mockResponsePositive = testConfig.isAuth;
    mockBackend.connections.subscribe((connection: MockConnection) => {
    expect(connection.request.url).toBe(requestURL, 'requested url should match with server api url');
    expect(connection.request.method).toBe(RequestMethod.Post, 'should handle requested method type.');
    connection.mockRespond(mockResponsePositive);
    });
    authenticationService.isUserAuthenticated(token).then((res: any) => {
    expect(res).toBeDefined();
    expect(res).toBe(mockResponsePositive.isAuthenticated, 'should handle to check if isAuthenticated method is returns true');
    });
  }));


  // ------------ Testing to handle 404 Error of IsUserAuthenticated ------------//
  it('should handle 404 error of isAuthenticated funtion', fakeAsync(() => {
    requestURL = testConfig.isAuthURL;
    mockResponseError = testConfig.authError404;
    mockBackend.connections.subscribe((connection: MockConnection) => {
    expect(connection.request.url).toBe(requestURL, 'requested url should match with server api url');
    expect(connection.request.method).toBe(RequestMethod.Post, 'should handle requested method type.');
    connection.mockError(mockResponseError);
    });
    authenticationService.isUserAuthenticated(token).then((res: any) => {
      expect(res).toBeDefined();
    },
    (err: any) => {
      expect(err.status).toBe(mockResponseError.status, 'should handle to check 404 error of isAuthenticated method');
    });
  }));

  // ------------ Testing to handle 403 Error of IsUserAuthenticated ------------//
  it('should handle 403 error of isAuthenticated funtion', fakeAsync(() => {
    requestURL = testConfig.isAuthURL;
    mockResponseError = testConfig.authError403;
    mockBackend.connections.subscribe((connection: MockConnection) => {
    expect(connection.request.url).toBe(requestURL, 'requested url should match with server api url');
    expect(connection.request.method).toBe(RequestMethod.Post, 'should handle requested method type.');
    connection.mockError(mockResponseError);
    });
    authenticationService.isUserAuthenticated(token).then((res: any) => {
      expect(res).toBeDefined();
    },
    (err: any) => {
      expect(err.status).toBe(mockResponseError.status, 'should handle to check 403 error of isAuthenticated method');
    });
  }));
});
