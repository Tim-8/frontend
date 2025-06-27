import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegistrovaniKorisnik } from '../model/registrovaniKorisnik';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registracija',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent {
  registracijaForm: FormGroup;

  @Output()
  noviKorisnik = new EventEmitter<RegistrovaniKorisnik>();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.registracijaForm = this.formBuilder.group({
      korisnickoIme: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      lozinka: ['', [Validators.required, Validators.minLength(6)]],
      potvrdaLozinke: ['', Validators.required],
      aktivan: ['']
    }, {
      validators: this.potvrdaLozinkeValidator
    });
  }

  potvrdaLozinkeValidator(form: FormGroup) {
    const lozinka = form.get('lozinka')?.value;
    const potvrdaLozinke = form.get('potvrdaLozinke')?.value;
    return lozinka === potvrdaLozinke ? null : { lozinkeSeNePodudaraju: true };
  }

  registrujSe() {
    if (this.registracijaForm.valid) {
      let user: RegistrovaniKorisnik;

      user = {
        id: 0,
        korisnickoIme: this.registracijaForm.value.korisnickoIme,
        lozinka: this.registracijaForm.value.lozinka,
        email: this.registracijaForm.value.email,
        aktivan: false
      };

      this.authService.registerUser(user).subscribe( 
        () => {
          this.router.navigate(['/prijava']);
        },
        (error) => {
            console.error('Greska prilikom registracije:', error);
        }
      );
    } else {
      alert('Forma nije validna. Proverite polja.');
    }
  }

  prijaviSe(): void {
    this.router.navigate(['/prijava']);
  }
}
