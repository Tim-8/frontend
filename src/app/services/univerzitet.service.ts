import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Univerzitet } from '../model/univerzitet';

@Injectable({
  providedIn: 'root'
})
export class UniverzitetService {
private apiUrl = 'http://localhost:8080/api/univerziteti';

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

  getAll(): Observable<Univerzitet[]> {
    return this.http.get<Univerzitet[]>(this.apiUrl, {
      headers: this.getHeaders()
    })
  }

  save(univerzitet: Univerzitet): Observable<Univerzitet> {
    return this.http.put<Univerzitet>(`${this.apiUrl}`, univerzitet, {
      headers: this.getHeaders()
    })
  }
}
