import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { StudijskiProgram } from '../model/studijskiProgram';

@Injectable({
  providedIn: 'root'
})
export class StudijskiProgramService {
  private apiUrl = 'http://localhost:8080/api/studijskiProgrami';

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

  getAll(): Observable<StudijskiProgram[]> {
    return this.http.get<StudijskiProgram[]>(this.apiUrl, {
      headers: this.getHeaders()
    })
  }

  getById(id: number): Observable<StudijskiProgram> {
    return this.http.get<StudijskiProgram>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    })
  }

  createStudijskiProgram(studijskiProgram: StudijskiProgram): Observable<any> {
    const endpoint = `${this.apiUrl}/kreiraj`;
    return this.http.post(endpoint, studijskiProgram, { headers: this.getHeaders() });    
  }

  updateStudijskiProgram(id: number, studijskiProgram: StudijskiProgram): Observable<StudijskiProgram> {
    return this.http.put<StudijskiProgram>(`${this.apiUrl}/${id}`, studijskiProgram, {
      headers: this.getHeaders()
    })
  }

  deleteStudijskiProgram(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    })
  }
}
