import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegistracijaZahtev } from '../model/registracijaZahtev';
import { RegistrovaniKorisnikService } from '../services/registrovani-korisnik.service';

@Component({
  selector: 'app-registracija',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent {
  registracijaForma: FormGroup;
  poslato = false;

  @Output()
  noviKorisnik = new EventEmitter<RegistracijaZahtev>();

  constructor(
    private formBuilder: FormBuilder,
    private korisnikService: RegistrovaniKorisnikService
  ) {
    this.registracijaForma = this.formBuilder.group({
      korisnickoIme: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      lozinka: ['', [Validators.required, Validators.minLength(6)]],
      potvrdaLozinke: ['', Validators.required]
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
    this.poslato = true;

    if (this.registracijaForma.invalid) {
      return;
    }

    const registracijaZahtev: RegistracijaZahtev = {
      id: 0,
      korisnickoIme: this.registracijaForma.value.korisnickoIme,
      lozinka: this.registracijaForma.value.lozinka,
      email: this.registracijaForma.value.email
    };

    this.korisnikService.registruj(registracijaZahtev).subscribe({
      next: (odgovor) => {
        console.log('Uspešna registracija:', odgovor);
        this.noviKorisnik.emit(registracijaZahtev);
        this.registracijaForma.reset();
        this.poslato = false;
      },
      error: (err) => {
        console.error('Greška pri registraciji:', err);
      }
    });
  }

  prijaviSe() {
    
  }
}
