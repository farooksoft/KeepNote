import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { RouterService } from '../src/app/services/router.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import {
  routes,
  LoginDummyComponent,
  DashboardDummyComponent,
  AppDummyComponent} from './routes.test';

describe('RouterService', () => {
  let router: Router;
  let location: Location;
  let routerService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginDummyComponent,
        DashboardDummyComponent,
        AppDummyComponent],
      imports: [
        RouterTestingModule.withRoutes(routes)
      ],
      providers: [ RouterService ]
    });
    router =  TestBed.get(Router);
    location = TestBed.get(Location);
    routerService = TestBed.get(RouterService);
  });

  it('should be created', inject([RouterService], (service: RouterService) => {
    expect(service).toBeTruthy();
  }));

  it('should handle to navigate on note view', fakeAsync(() => {
    routerService.routeToDashboard();
    tick();
    expect(location.path()).toContain('/dashboard',
        `should navigate to note view page`);
  }));

  it('should handle to navigate login view', fakeAsync(() => {
    routerService.routeToLogin();
    tick();
    expect(location.path()).toContain('/login',
        `should navigate to login page`);
  }));
});
