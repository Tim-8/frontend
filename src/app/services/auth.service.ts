import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Student } from '../model/student';
import { Nastavnik } from '../model/nastavnik';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) { }

  prijavi(credentials: any): Observable<string> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/prijava`, credentials)
              .pipe(
                map(response => response.token) 
              );
  }

  registrujStudenta(student: Student): Observable<any> {
    const endpoint = `${this.apiUrl}/registracija/student`;
    const token = this.dobaviToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(endpoint, student, { headers: headers });
  }

  registrujNastavnika(nastavnik: Nastavnik): Observable<any> {
    const endpoint = `${this.apiUrl}/registracija/nastavnik`;
    const token = this.dobaviToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(endpoint, nastavnik, { headers: headers });
  }

  dobaviToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  sacuvajToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }

  sacuvajUlogeIzTokena(token: string): void {
    try {
      const decodedToken = this.jwtHelper.decodeToken(token);
      const roles = decodedToken?.roles;

      if (roles) {
        localStorage.setItem('roles', Array.isArray(roles) ? roles.join(',') : String(roles));
      } else {
        localStorage.removeItem('roles');
      }
    } catch (error) {
      console.error('Greska pri dekodovanju tokena:', error);
      localStorage.removeItem('roles');
    }
  }

  ukloniToken(): void {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('roles');
  }

  jePrijavljen(): boolean {
    const token = this.dobaviToken();
    return !!token;
  }

  imaUlogu(uloge: string[]): boolean {
    const rolesString = localStorage.getItem('roles');
    if (!rolesString) {
      return false;
    }
    const rolesArray = rolesString.split(',');
    return uloge.some(role => rolesArray.includes(role));
  }
}