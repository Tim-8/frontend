import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../model/student';
import { Nastavnik } from '../model/nastavnik';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/registrovaniKorisnici'; 
  private jwtHelper = new JwtHelperService();
  constructor(private http: HttpClient) { }

  prijavi(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/prijava`, credentials, { responseType: 'text' });
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
        localStorage.setItem('roles', Array.isArray(roles) ? roles.join(',') : roles);
      }
    } catch (error) {
      console.error('Greška pri dekodovanju tokena:', error);
    }
  }

  ukloniToken(): void {
    localStorage.removeItem('jwtToken');
  }

  jePrijavljen(): boolean {
    return !!localStorage.getItem('jwtToken');
  }

  imaUlogu(uloge: string[]): boolean {
    const roles = localStorage.getItem('roles')?.split(',') || [];
    return uloge.some(role => roles.includes(role));
  }
}