import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { RouterService } from '../src/app/services/router.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import {
  routes,
  EditNoteOpenerDummyComponent,
  LoginDummyComponent,
  ListViewDummyComponent,
  NoteViewDummyComponent,
  DashboardDummyComponent,
  AppDummyComponent} from './routes.test';

describe('RouterService', () => {
  let router: Router;
  let location: Location;
  let routerService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
      EditNoteOpenerDummyComponent,
      LoginDummyComponent,
      ListViewDummyComponent,
      NoteViewDummyComponent,
      DashboardDummyComponent,
      AppDummyComponent],
      imports: [
      RouterTestingModule.withRoutes(routes)
      ],
      providers: [RouterService]
    });
    router =  TestBed.get(Router);
    location = TestBed.get(Location);
    routerService = TestBed.get(RouterService);
  });

  it('should be created', inject([RouterService], (service: RouterService) => {
    expect(service).toBeTruthy();
  }));

  it('should handle navigation to notes view', fakeAsync(() => {
    routerService.routeToDashboard();
    tick();
    expect(location.path()).toContain('/dashboard/view/noteview',
        `should navigate to note view page`);
  }));

  it('should handle navigation to login view', fakeAsync(() => {
    routerService.routeToLogin();
    tick();
    expect(location.path()).toContain('/login',
        `should navigate to login page`);
  }));

  it('should handle navigation to edit note view', fakeAsync(() => {
    routerService.routeToEditNoteView(1);
    tick();
    expect(location.path()).toContain('/dashboard/(noteEditOutlet:note/1/edit)',
        `should navigate to edit note view page`);
  }));

  it('should handle navigation to previous route', fakeAsync(() => {
    router.navigate(['/dashboard/view/noteview']);
    tick();
    router.navigate(['dashboard', {
      outlets: {
        noteEditOutlet: ['note', 1, 'edit'],
      }
    }]);
    tick();
    routerService.routeBack();
    tick();
    expect(location.path()).toContain('/dashboard/view/noteview',
        `should navigaten to note view page`);
  }));
});
