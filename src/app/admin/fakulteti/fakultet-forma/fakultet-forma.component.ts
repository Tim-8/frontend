import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Fakultet } from '../../../model/fakultet';
import { FakultetService } from '../../../services/fakultet.service';
import { NastavnikService } from '../../../services/nastavnik.service';
import { AdresaFormaComponent } from '../../adresa-forma/adresa-forma.component';
import { UniverzitetService } from '../../../services/univerzitet.service';

@Component({
  selector: 'app-fakultet-forma',
  imports: [CommonModule, ReactiveFormsModule, AdresaFormaComponent],
  templateUrl: './fakultet-forma.component.html',
  styleUrl: './fakultet-forma.component.css'
})
export class FakultetFormaComponent {
  fakultetForm: FormGroup;
  univerziteti: any[] = [];
  nastavnici: any[] = [];

  @Input() fakultetZaIzmenu?: Fakultet;
  @Output() fakultetSaved = new EventEmitter<Fakultet>();

  constructor(
    private formBuilder: FormBuilder,
    private fakultetService: FakultetService,
    private univerzitetService: UniverzitetService,
    private nastavnikService: NastavnikService
  ) {
    this.fakultetForm = this.formBuilder.group({
      naziv: ['', [Validators.required, Validators.minLength(3)]],
      adresa: this.formBuilder.group({
        drzava: ['', Validators.required],
        mesto: ['', Validators.required],
        ulica: ['', Validators.required],
        broj: ['', Validators.required]
      }),
      univerzitet: [''],
      studijskiProgrami: this.formBuilder.array([]),
      dekan: [''],
      opis: ['']
    }); 

    this.ucitajUniverzitete();
    this.ucitajNastavnike();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['fakultetZaIzmenu'] && this.fakultetZaIzmenu) {
      this.fakultetForm.patchValue(this.fakultetZaIzmenu);
    } else {
      this.fakultetForm.reset();
    }
  } 
    
  get adresaFormGroup(): FormGroup {
    return this.fakultetForm.get('adresa') as FormGroup;
  }

  get studijskiProgrami(): FormArray {
    return this.fakultetForm.get('studijskiProgrami') as FormArray;
  }

  ucitajUniverzitete(): void {
    this.univerzitetService.getAll().subscribe({
      next: data => this.univerziteti = data,
      error: err => console.error("Greska pri ucitavanju univerziteta ", err)
    });
  }

  ucitajNastavnike(): void {
    this.nastavnikService.getAll().subscribe({
      next: data => this.nastavnici = data,
      error: err => console.error("Greska pri ucitavanju nastavnika: ", err)
    });
  }

  dodajStudijskiProgram(): void {
    const programGroup = this.formBuilder.group({
      naziv: ['', Validators.required],
    });

    this.studijskiProgrami.push(programGroup);
  }

  ukloniStudijskiProgram(index: number): void {
    this.studijskiProgrami.removeAt(index);
  }

  sacuvaj(): void {
    if (this.fakultetForm.invalid) {
      return;
    }
    
    const fakultet: Fakultet = this.fakultetForm.value;

    if (this.fakultetZaIzmenu) {
      this.fakultetService.updateFakultet(this.fakultetZaIzmenu.id!, fakultet).subscribe({
        next: () => {
          alert("Fakultet je uspesno sacuvan");
          this.fakultetForm.reset();
          this.fakultetSaved.emit()
        },
        error: (err) => console.error("Greska pri izmeni fakulteta: ", err)
      });
    } else {
      this.fakultetService.createFakultet(fakultet).subscribe({
        next: () => {
          alert("Novi fakultet je uspesno kreiran.");
          this.fakultetForm.reset();
          this.fakultetSaved.emit();
        },
        error: (err) => console.error("Greska pri kreiranju fakulteta: ", fakultet, err)
      });
    }
  }
}
