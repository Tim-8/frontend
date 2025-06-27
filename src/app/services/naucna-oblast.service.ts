import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Nastavnik } from '../model/nastavnik';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NaucnaOblastService {
  private apiUrl = 'http://localhost:8080/api/oblasti';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('No authentication token found.');
    }
    return new HttpHeaders ({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getAll(): Observable<Nastavnik[]> {
    return this.http.get<Nastavnik[]>(this.apiUrl, {
      headers: this.getHeaders()
    })
  }
}
