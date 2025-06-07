import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fakultet } from '../model/fakultet';
import { HttpClient } from '@angular/common/http';
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

  getAllFakulteti(): Observable<Fakultet[]> {
    return this.http.get<Fakultet[]>(this.apiUrl);
  }

  getFakultetById(id: number): Observable<Fakultet> {
    return this.http.get<Fakultet>(`${this.apiUrl}/${id}`);
  }
}
