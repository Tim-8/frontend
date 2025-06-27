import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NastavnikService } from '../../services/nastavnik.service';
import { RegistrovaniKorisnik } from '../../model/registrovaniKorisnik';
import { Nastavnik } from '../../model/nastavnik';
import { ZvanjeFormaComponent } from '../zvanje-forma/zvanje-forma.component';
import { Zvanje } from '../../model/zvanje';
import { TipZvanja } from '../../model/tipZvanja';
import { NaucnaOblast } from '../../model/naucnaOblast';

@Component({
  selector: 'app-nastavnik-forma',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ZvanjeFormaComponent],
  templateUrl: './nastavnik-forma.component.html',
  styleUrls: ['./nastavnik-forma.component.css']
})
export class NastavnikFormaComponent {
  nastavnikForm: FormGroup;
  naucneOblasti: any[] = [];

  @Output()
  noviKorisnik = new EventEmitter<RegistrovaniKorisnik>();

  constructor(
    private formBuilder: FormBuilder,
    private nastavnikService: NastavnikService,
  ) {
    this.nastavnikForm = this.formBuilder.group({
      korisnickoIme: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      lozinka: ['', [Validators.required, Validators.minLength(6)]],
      potvrdaLozinke: ['', Validators.required],
      aktivan: [false],
      ime: ['', Validators.required],
      jmbg: ['', [Validators.required, Validators.minLength(13)]],
      biografija: [''],
      zvanje: this.formBuilder.group({
        datumIzbora: ['', Validators.required],
        datumPrestanka: ['', Validators.required],
        tipZvanja: ['', Validators.required],
        naucnaOblast: ['', Validators.required]
      })
    }, {
      validators: this.potvrdaLozinkeValidator
    });
  }

  get zvanjeFormGroup(): FormGroup {
    return this.nastavnikForm.get('zvanje') as FormGroup;
  }

  potvrdaLozinkeValidator(grupa: FormGroup) {
    const lozinka = grupa.get('lozinka')?.value;
    const potvrdaLozinke = grupa.get('potvrdaLozinke')?.value;
    return lozinka === potvrdaLozinke ? null : { lozinkeSeNePodudaraju: true };
  }

  kreirajNastavnika(): void {
    if (this.nastavnikForm.valid) {
      const zvanjeGroup = this.nastavnikForm.get('zvanje')?.value;

      const naucnaOblast: NaucnaOblast = {
        id: 0,
        naziv: zvanjeGroup.naucnaOblast
      };

      const tipZvanja: TipZvanja = {
        id: 0,
        naziv: zvanjeGroup.tipZvanja
      };

      const zvanje: Zvanje = {
        id: 0,
        datumIzbora: zvanjeGroup.datumIzbora,
        datumPrestanka: zvanjeGroup.datumPrestanka,
        tipZvanja: tipZvanja,
        naucnaOblast: naucnaOblast
      };

      const nastavnik: Nastavnik = {
        id: 0,
        korisnickoIme: this.nastavnikForm.value.korisnickoIme,
        email: this.nastavnikForm.value.email,
        lozinka: this.nastavnikForm.value.lozinka,
        aktivan: this.nastavnikForm.value.aktivan,
        ime: this.nastavnikForm.value.ime,
        jmbg: this.nastavnikForm.value.jmbg,
        biografija: this.nastavnikForm.value.biografija,
        zvanje: zvanje
      };

      this.nastavnikService.createNastavnik(nastavnik).subscribe({
      next: () => {
        alert('Nastavnik uspešno kreiran.');
        this.nastavnikForm.reset();
      },
      error: err => {
        console.log(nastavnik);
        console.error('Greška pri kreiranju nastavnika:', err);
      }
    });
    } else {
      alert('Forma nije validna. Proverite polja.');
    }
  }
}
