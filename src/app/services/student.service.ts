import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../model/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:8080/api/studenti';

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

  getAll(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl, {
      headers: this.getHeaders()
    });
  }

  getStudentById(id: number): Observable<Student>{
    return this.http.get<Student>(`this.apiUrl/${id}`, {
      headers: this.getHeaders()
    });
  }

  createStudent(student: Student): Observable<any> {
    const endpoint = `${this.apiUrl}/kreiraj`;
    return this.http.post(endpoint, student, { headers: this.getHeaders() })
  }
}
