
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

import { RegistrovaniKorisnik } from '../model/registrovaniKorisnik';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/registrovaniKorisnici';

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) { }

  login(credentials: any): Observable<string> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/prijava`, credentials)
              .pipe(
                map(response => response.token),
                tap(token => this.saveToken(token)) 
              );
  }

  registerUser(user: RegistrovaniKorisnik): Observable<any> {
    const endpoint = `${this.apiUrl}/registracija`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(endpoint, user, { headers: headers });
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  saveToken(token: string): void {
    const decodedToken = this.jwtHelper.decodeToken(token);
    const roles = decodedToken?.roles;

    if (roles) {
      localStorage.setItem('roles', Array.isArray(roles) ? roles.join(',') : String(roles));
    } else {
      localStorage.removeItem('roles');
    }

    localStorage.setItem('jwtToken', token);
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  hasRole(uloge: string[]): boolean {
    const rolesString = localStorage.getItem('roles');
    if (!rolesString) {
      return false;
    }
    const rolesArray = rolesString.split(',');
    return uloge.some(role => rolesArray.includes(role));
  }

  logout() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('roles');
  }

  getLoggedUserId() {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken?.id || null;
  }
}