import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { RegistrovaniKorisnik } from '../model/registrovaniKorisnik';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private userUrl: string;

  constructor(private http: HttpClient) { 
    this.userUrl = 'http://localhost:8080/api/registrovaniKorisnici';
  }

  registruj(noviKorisnik: RegistrovaniKorisnik): Observable<RegistrovaniKorisnik> {
    return this.http.post<RegistrovaniKorisnik>(`${this.userUrl}/registracija`, noviKorisnik);
  }

  prijavi(credentials: { korisnickoIme: string, lozinka: string }): Observable<any> {
    return this.http.post<any>(`${this.userUrl}/prijava`, credentials)
      .pipe(
        tap(response => {
          localStorage.setItem('currentUser', JSON.stringify(response));
          localStorage.setItem('auth_token', response.token);
        })
      );
    }

    isAuthenticated() : boolean {
      const token = localStorage.getItem('authToken');
      const helper = new JwtHelperService();
      const isExpired = helper.isTokenExpired(token);
      return !isExpired;
    }

    isLoggedIn(): boolean {
      return localStorage.getItem('currentUser') !== null;
    }

    logout(): void {
      localStorage.removeItem('currentUser');
    }
}
