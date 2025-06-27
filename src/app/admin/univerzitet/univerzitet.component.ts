import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdresaFormaComponent } from '../adresa-forma/adresa-forma.component';
import { NastavnikService } from '../../services/nastavnik.service';
import { UniverzitetService } from '../../services/univerzitet.service';

@Component({
  selector: 'app-univerzitet',
  imports: [CommonModule, ReactiveFormsModule, AdresaFormaComponent],
  templateUrl: './univerzitet.component.html',
  styleUrl: './univerzitet.component.css'
})
export class UniverzitetComponent {
  univerzitetForm: FormGroup;
  nastavnici: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private univerzitetService: UniverzitetService,
    private nastavnikService: NastavnikService
  ) {
    this.univerzitetForm = this.formBuilder.group({
      id: [null],
      naziv: ['', [Validators.required, Validators.minLength(3)]],
      datumOsnivanja: ['', [Validators.required]],
      adresa: this.formBuilder.group({
        drzava: ['', Validators.required],
        mesto: ['', Validators.required],
        ulica: ['', Validators.required],
        broj: ['', Validators.required]
      }),
      fakulteti: this.formBuilder.array([]),
      rektor: [''],
      opis: ['']
    });

    this.ucitajUniverzitet();
    this.ucitajNastavnike();
  }

  get adresaFormGroup(): FormGroup {
    return this.univerzitetForm.get('adresa') as FormGroup;
  }

  get fakulteti(): FormArray {
    return this.univerzitetForm.get('fakulteti') as FormArray;
  }

  ucitajUniverzitet(): void {
    this.univerzitetService.getAll().subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.univerzitetForm.patchValue(data[0]); 
        }
      },
    });
  }

  ucitajNastavnike(): void {
    this.nastavnikService.getAll().subscribe({
      next: data => this.nastavnici = data,
      error: err => console.error("Greska pri ucitavanju nastavnika: ", err)
    });
  }

  dodajFakultet(): void {
    const fakultetGroup = this.formBuilder.group({
      naziv: ['', Validators.required],
    });

    this.fakulteti.push(fakultetGroup);
  }

  ukloniFakultet(index: number): void {
    this.fakulteti.removeAt(index);
  }

  sacuvaj(): void {
    if (this.univerzitetForm.valid) {
      this.univerzitetService.save(this.univerzitetForm.value).subscribe({
        next: () => {
            alert("Univerzitet je uspesno sacuvan");
            this.ucitajUniverzitet();
          },
          error: (err) => console.error("Greska pri izmeni univerziteta: ", err)
        });
      } else {
        alert('Forma nije validna. Proverite polja.');
      }
    }
}
