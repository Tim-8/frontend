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

    if (this.prijavaForma.invalid) {
      return;
    }

    const credentials= {
      korisnickoIme: this.prijavaForma.get('korisnickoIme')?.value,
      lozinka: this.prijavaForma.get('lozinka')?.value
    }
   
   this.authService.login(credentials).subscribe({
      next: (jwtToken) => { 
        console.log('Uspesna prijava. ');
       
        if (this.authService.hasRole(['ROLE_ADMIN'])) { 
          this.router.navigate(['/admin-dashboard']);
        } else if (this.authService.hasRole(['ROLE_OSOBLJE'])) {
          this.router.navigate(['/osoblje-dashboard']);
        } else {
          this.router.navigate(['/detalji']);
        } 
      },
      error: (err) => {
        if (err.status === 401) {
          alert('Neispravno korisnicko ime ili lozinka.');
        } else {
          alert('Doslo je do greske prilikom prijave. Pokusajte ponovo.');
        }
      }
    })
  }

  registrujSe(): void {
    this.router.navigate(['/registracija']);
  }
}
