import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegistrovaniKorisnik } from '../model/registrovaniKorisnik';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Student } from '../model/student';
import { Nastavnik } from '../model/nastavnik';

@Component({
  selector: 'app-registracija',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent {
  registracijaForma: FormGroup;
  role: string ='STUDENT';
  poslato = false;
  isAdministrator = false;

  @Output()
  noviKorisnik = new EventEmitter<RegistrovaniKorisnik>();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.registracijaForma = this.formBuilder.group({
      korisnickoIme: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      lozinka: ['', [Validators.required, Validators.minLength(6)]],
      potvrdaLozinke: ['', Validators.required],
      ime: [''],
      jmbg: ['', []],
      biografija: [''],
      role: ['STUDENT', Validators.required]
    }, {
      validators: this.potvrdaLozinkeValidator
    });
  }

  potvrdaLozinkeValidator(grupa: FormGroup) {
    const lozinka = grupa.get('lozinka')?.value;
    const potvrdaLozinke = grupa.get('potvrdaLozinke')?.value;
    return lozinka === potvrdaLozinke ? null : { lozinkeSeNePodudaraju: true };
  }

  registrujSe() {
    if (this.registracijaForma.valid) {
      this.poslato = true;
      let user: Student | Nastavnik;

      if (this.role === 'STUDENT') {
        user = {
          id: 0,
          korisnickoIme: this.registracijaForma.value.korisnickoIme,
          lozinka: this.registracijaForma.value.lozinka,
          email: this.registracijaForma.value.email,
          ime: this.registracijaForma.value.ime,
          jmbg: this.registracijaForma.value.jmbg
        };

        this.authService.registrujStudenta(user).subscribe( 
        () => {
          this.router.navigate(['/prijava']);
        },
        (error) => {
            console.error('Greska prilikom registracije:', error);
        }
      );
      } else if (this.role === 'NASTAVNIK') {
        user = {
          id: 0,
          korisnickoIme: this.registracijaForma.value.korisnickoIme,
          lozinka: this.registracijaForma.value.lozinka,
          email: this.registracijaForma.value.email,
          ime: this.registracijaForma.value.ime,
          biografija: this.registracijaForma.value.biografija,
          jmbg: this.registracijaForma.value.jmbg
        }

        this.authService.registrujNastavnika(user).subscribe( 
        () => {
          this.router.navigate(['/homepage']);
        },
        (error) => {
            console.error('Greska prilikom registracije:', error);
        }
      );
      } else {
        return;
      }
    } else {
      console.error('Greska prilikom registracije:');
    }
  }

  onRoleChange(event: any) {
    this.role = event.target.value;
  } 

  prijaviSe(): void {
    this.router.navigate(['/prijava']);
  }
}
