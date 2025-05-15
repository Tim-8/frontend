import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../model/student';
import { Nastavnik } from '../model/nastavnik';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:8080/api/registrovaniKorisnici'; 

  constructor(private http: HttpClient) { }

  prijavi(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/prijava`, credentials, { responseType: 'text' });
  }

  registrujKorisnika(user: Student | Nastavnik, userType: string): Observable<any> {
    const endpoint = `${this.apiUrl}/registracija`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { ...user, userType: userType };
    return this.http.post(endpoint, body, { headers: headers });
  }

  dobaviToken(): string | null {
    return localStorage.getItem('jwtToken'); 
  }

  sacuvajToken(token: string): void {
    localStorage.setItem('jwtToken', token); 
  }

  ukloniToken(): void {
    localStorage.removeItem('jwtToken');
  }

  dobaviRegistrovaneKorisnike(): Observable<any[]> {
    const token = this.dobaviToken();
    const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>('http://localhost:8080/api/registrovaniKorisnici', { headers });
  }
}