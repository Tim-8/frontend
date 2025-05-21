import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-prijava',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './prijava.component.html',
  styleUrl: './prijava.component.css'
})
export class PrijavaComponent {
  prijavaForma: FormGroup;
  loginError: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.prijavaForma = this.formBuilder.group({
      korisnickoIme: ['', [Validators.required]],
      lozinka: ['', [Validators.required]]
    }) 
  }

  prijaviSe() {
    this.loginError = null;
    
    if (this.prijavaForma.invalid) {
      return;
    }

    const credentials= {
      korisnickoIme: this.prijavaForma.get('korisnickoIme')?.value,
      lozinka: this.prijavaForma.get('lozinka')?.value
    }
   
   this.authService.prijavi(credentials).subscribe({
      next: (jwtToken) => { 
        console.log('Uspesna prijava. Token:', jwtToken);
        if (jwtToken) {
          this.authService.sacuvajToken(jwtToken);
          this.authService.sacuvajUlogeIzTokena(jwtToken);

          const storedRoles = localStorage.getItem('roles');

          if (storedRoles && storedRoles.includes('ROLE_ADMIN')) {
            this.router.navigate(['/aktivacija']);
          } else {
            this.router.navigate(['/homepage']);
          }
        } 
      },
      error: (err) => {
        if (err.status === 401) {
          this.loginError = 'Neispravno korisnicko ime ili lozinka';
        } else {
          this.loginError = 'Doslo je do greske prilikom prijave. Pokusajte ponovo.';
        }
      }
    })
  }

  registrujSe(): void {
    this.router.navigate(['/registracija']);
  }
}
