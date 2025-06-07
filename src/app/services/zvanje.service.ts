import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Zvanje } from '../model/zvanje';

@Injectable({
  providedIn: 'root'
})
export class ZvanjeService {
  private apiUrl = 'http://localhost:8080/api/zvanja';

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

  getAll(): Observable<Zvanje[]> {
    return this.http.get<Zvanje[]>(this.apiUrl, {
      headers: this.getHeaders()
    })
  }
}
