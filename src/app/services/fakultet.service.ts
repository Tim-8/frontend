import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fakultet } from '../model/fakultet';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FakultetService {
  private apiUrl = 'http://localhost:8080/api/fakulteti';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

 private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  getAll(): Observable<Fakultet[]> {
    return this.http.get<Fakultet[]>(this.apiUrl, {
      headers: this.getHeaders()
    })
  }

  getFakultetById(id: number): Observable<Fakultet> {
    return this.http.get<Fakultet>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    })
  }

  createFakultet(fakultet: Fakultet): Observable<any> {
    const endpoint = `${this.apiUrl}/kreiraj`;
    return this.http.post(endpoint, fakultet, { headers: this.getHeaders() });
  }

  updateFakultet(id: number, fakultet: Fakultet): Observable<Fakultet> {
    return this.http.put<Fakultet>(`${this.apiUrl}/${id}`, fakultet, {
      headers: this.getHeaders()
    })
  }

  deleteFakultet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    })
  }
}
