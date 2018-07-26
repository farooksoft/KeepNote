import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {

  private authUrl: string;

  constructor(public http: HttpClient) {
    this.authUrl = 'http://localhost:3000/auth/v1/';
   }

  authenticateUser(data) {
    return this.http.post(this.authUrl, data);
  }

  setBearerToken(token) {
    localStorage.setItem('bearerToken', token);
  }

  getBearerToken() {
    return localStorage.getItem('bearerToken');
  }

  isUserAuthenticated(token): Promise<boolean> {
   return this.http.post(`${this.authUrl}isAuthenticated`, {}, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    })
    .map((res) => res['isAuthenticated'])
    .toPromise();
  }

}
