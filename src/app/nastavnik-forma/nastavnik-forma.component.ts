import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ZvanjeService } from '../services/zvanje.service';
import { NaucnaOblastService } from '../services/naucna-oblast.service';
import { NastavnikService } from '../services/nastavnik.service';
import { RegistrovaniKorisnik } from '../model/registrovaniKorisnik';
import { Nastavnik } from '../model/nastavnik';
import { AdminMenuComponent } from '../admin/admin-menu/admin-menu.component';

@Component({
  selector: 'app-nastavnik-forma',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AdminMenuComponent],
  templateUrl: './nastavnik-forma.component.html',
  styleUrls: ['./nastavnik-forma.component.css']
})
export class NastavnikFormaComponent {
  nastavnikForma: FormGroup;
  zvanja: any[] = [];
  naucneOblasti: any[] = [];
  poslato = false;

  @Output()
  noviKorisnik = new EventEmitter<RegistrovaniKorisnik>();

  constructor(
    private formBuilder: FormBuilder,
    private nastavnikService: NastavnikService,
    private zvanjeService: ZvanjeService,
    private oblastService: NaucnaOblastService,
    private router: Router
  ) {
    this.nastavnikForma = this.formBuilder.group({
      korisnickoIme: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      lozinka: ['', [Validators.required, Validators.minLength(6)]],
      potvrdaLozinke: ['', Validators.required],
      ime: ['', Validators.required],
      jmbg: ['', [Validators.required, Validators.minLength(13)]],
      biografija: [''],
      zvanjeId: ['', Validators.required],
      naucnaOblastId: ['', Validators.required],
      brojCasova: [0, [Validators.required, Validators.min(0)]],
      aktivan: [false]
    }, {
      validators: this.potvrdaLozinkeValidator
    });

    this.ucitajZvanja();
    this.ucitajNaucneOblasti();
  }

  potvrdaLozinkeValidator(grupa: FormGroup) {
    const lozinka = grupa.get('lozinka')?.value;
    const potvrdaLozinke = grupa.get('potvrdaLozinke')?.value;
    return lozinka === potvrdaLozinke ? null : { lozinkeSeNePodudaraju: true };
  }

  ucitajZvanja(): void {
    this.zvanjeService.getAll().subscribe({
      next: data => this.zvanja = data,
      error: err => console.error('Greška pri učitavanju zvanja', err)
    });
  }

  ucitajNaucneOblasti(): void {
    this.oblastService.getAll().subscribe({
      next: data => this.naucneOblasti = data,
      error: err => console.error('Greška pri učitavanju oblasti', err)
    });
  }

  kreirajNastavnika(): void {
    if (this.nastavnikForma.invalid) {
      this.nastavnikForma.markAllAsTouched();
      return;
    }

    const nastavnik: Nastavnik = {
      id: 0,
      korisnickoIme: this.nastavnikForma.value.korisnickoIme,
      email: this.nastavnikForma.value.email,
      lozinka: this.nastavnikForma.value.lozinka,
      ime: this.nastavnikForma.value.ime,
      jmbg: this.nastavnikForma.value.jmbg,
      biografija: this.nastavnikForma.value.biografija,
      aktivan: this.nastavnikForma.value.aktivan,
      zvanjeId: this.nastavnikForma.value.zvanjeId,
      naucnaOblastId: this.nastavnikForma.value.naucnaOblastId,
      brojCasova: this.nastavnikForma.value.brojCasova
    };

    this.poslato = true;

    this.nastavnikService.createNastavnik(nastavnik).subscribe({
      next: () => {
        alert('Nastavnik uspešno kreiran.');
        this.nastavnikForma.reset();
        this.noviKorisnik.emit(nastavnik);
        this.router.navigate(['/admin/nastavnici']);
      },
      error: err => {
        console.error('Greška pri kreiranju nastavnika:', err);
        alert('Greška pri kreiranju nastavnika.');
      }
    });
  }
}
