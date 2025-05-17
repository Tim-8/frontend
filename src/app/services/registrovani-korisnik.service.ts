import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistrovaniKorisnik } from '../model/registrovaniKorisnik';

@Injectable({
  providedIn: 'root'
})
export class RegistrovaniKorisnikService {

  private userUrl: string;

  constructor(private http: HttpClient) { 
    this.userUrl = 'http://localhost:8080/api/registrovaniKorisnici';
  }

  getAll(): Observable<RegistrovaniKorisnik[]> {
    return this.http.get<RegistrovaniKorisnik[]>(this.userUrl);
  }
}
