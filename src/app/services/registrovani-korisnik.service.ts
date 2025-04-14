import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistrovaniKorisnik } from '../model/registrovaniKorisnik';
import { RegistracijaZahtev } from '../model/registracijaZahtev';

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
  create(korisnik: RegistrovaniKorisnik): Observable<RegistrovaniKorisnik> {
    return this.http.post<RegistrovaniKorisnik>(this.userUrl, korisnik);
  }
  registruj(registracijaZahtev: RegistracijaZahtev): Observable<RegistrovaniKorisnik> {
    return this.http.post<RegistrovaniKorisnik>(`${this.userUrl}/registracija`, registracijaZahtev);
  }
}
