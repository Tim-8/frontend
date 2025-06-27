import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Predmet } from '../model/predmet';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PredmetService {
  private apiUrl = 'http://localhost:8080/api/predmeti';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('No authentication token found.');
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getAll(): Observable<Predmet[]> {
    return this.http.get<Predmet[]>(this.apiUrl, {
      headers: this.getHeaders()
    });
  }

  getPredmetById(id: number): Observable<Predmet>{
    return this.http.get<Predmet>(`this.apiUrl/${id}`, {
      headers: this.getHeaders()
    });
  }

  createPredmet(predmet: Predmet): Observable<any> {
    const endpoint = `${this.apiUrl}/kreiraj`;
    return this.http.post(endpoint, predmet, { headers: this.getHeaders() })
  }
}
