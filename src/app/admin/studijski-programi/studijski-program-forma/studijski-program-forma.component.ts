import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudijskiProgram } from '../../../model/studijskiProgram';
import { StudijskiProgramService } from '../../../services/studijski-program.service';
import { FakultetService } from '../../../services/fakultet.service';
import { NastavnikService } from '../../../services/nastavnik.service';

@Component({
  selector: 'app-studijski-program-forma',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './studijski-program-forma.component.html',
  styleUrl: './studijski-program-forma.component.css'
})
export class StudijskiProgramFormaComponent {
  spForm: FormGroup;
  fakulteti: any[] = [];
  nastavnici: any[] = [];

  @Input() spZaIzmenu? : StudijskiProgram;
  @Output() spSaved = new EventEmitter<StudijskiProgram>();

  constructor(
    private formBuilder: FormBuilder,
    private spService: StudijskiProgramService,
    private fakultetService: FakultetService,
    private nastavnikService: NastavnikService
  ) {
    this.spForm = this.formBuilder.group ({
      naziv: ['', [Validators.required, Validators.minLength(3)]],
      fakultet: [''],
      rukovodilac: [''],
      opis: ['']
    });

    this.ucitajFakultete();
    this.ucitajNastavnike();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['spZaIzmenu'] && this.spZaIzmenu) {
      this.spForm.patchValue(this.spZaIzmenu);
    } else {
      this.spForm.reset();
    } 
  }

  ucitajFakultete(): void {
    this.fakultetService.getAll().subscribe({
      next: data => this.fakulteti = data,
      error: err => console.error("Greska pri ucitavanju fakulteta: ", err)
    });
  }

  ucitajNastavnike(): void {
    this.nastavnikService.getAll().subscribe({
      next: data => this.nastavnici = data,
      error: err => console.error("Greska pri ucitavanju nastavnika: ", err)
    });
  }

  sacuvaj() {
    if (this.spForm.valid) {
      
      const studijskiProgram: StudijskiProgram = this.spForm.value;

      if (this.spZaIzmenu) {
        this.spService.updateStudijskiProgram(this.spZaIzmenu.id, studijskiProgram).subscribe({
          next: () => {
            alert("Studijski program je uspesno sacuvan");
            this.spForm.reset();
            this.spSaved.emit();
          },
          error: (err) => console.error("Greska pri izmeni studijskog programa: ", err)
        });
      } else {
        this.spService.createStudijskiProgram(studijskiProgram).subscribe({
          next: () => {
            alert("Novi studijski program je uspesno kreiran.");
            this.spForm.reset();
            this.spSaved.emit();
          },
          error: (err) => console.error("Greska pri kreiranju studijskog programa: ", studijskiProgram, err)
        });
      }
    } else {
      alert('Forma nije validna. Proverite polja.');
    }
  }
}
