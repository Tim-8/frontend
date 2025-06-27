import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { RegistrovaniKorisnik } from '../model/registrovaniKorisnik';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OsobljeService {
  private apiUrl = 'http://localhost:8080/api/osoblje'

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

  createOsoblje(registrovaniKorisnik: RegistrovaniKorisnik): Observable<any> {
    const endpoint = `${this.apiUrl}/kreiraj`;
    return this.http.post(endpoint, registrovaniKorisnik, { headers: this.getHeaders() });
  }
}
