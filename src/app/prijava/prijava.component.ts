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
      next: (odgovor) => {
        console.log('Uspešna prijava:', odgovor);
        this.authService.sacuvajToken(odgovor);
        this.authService.sacuvajUlogeIzTokena(odgovor)
        this.router.navigate(['/registracija']);
      },
      error: (err) => {
        if (err.status === 401) {
          this.loginError = 'Neispravno korisničko ime ili lozinka';
        } else {
          this.loginError = 'Došlo je do greške prilikom prijave. Pokušajte ponovo.';
        }
      }
    })
  }

  registrujSe(): void {
    this.router.navigate(['/registracija']);
  }
}
