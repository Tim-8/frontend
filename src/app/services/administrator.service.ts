import { Injectable } from '@angular/core';
import { RegistrovaniKorisnik } from '../model/registrovaniKorisnik';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdministratorService {
  private apiUrl = 'http://localhost:8080/api/registrovaniKorisnici';

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

  getAll(): Observable<RegistrovaniKorisnik[]> {
    return this.http.get<RegistrovaniKorisnik[]>(this.apiUrl, {
      headers: this.getHeaders()
    });
  }

  getUserById(id: number): Observable<RegistrovaniKorisnik> {
    return this.http.get<RegistrovaniKorisnik>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  getUsersByStatus(aktivan: boolean): Observable<RegistrovaniKorisnik[]> {
    return this.http.get<RegistrovaniKorisnik[]>(`${this.apiUrl}/status?aktivan=${aktivan}`, {
      headers: this.getHeaders()
    });
  }

  activateUser(id: number): Observable<RegistrovaniKorisnik> { 
    const endpoint = `${this.apiUrl}/aktivacija/${id}`; 
    return this.http.post<RegistrovaniKorisnik>(endpoint, {}, { headers: this.getHeaders() }); 
  }

  deleteUser(id: number): Observable<void> { 
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}