import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentService } from '../../../services/student.service';
import { FakultetService } from '../../../services/fakultet.service';
import { Student } from '../../../model/student';
import { PredmetService } from '../../../services/predmet.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-forma',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student-forma.component.html',
  styleUrl: './student-forma.component.css'
})
export class StudentFormaComponent {
  studentForm: FormGroup;
  fakulteti: any[] = [];
  predmetiLista: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private fakultetService: FakultetService,
    private predmetService: PredmetService
  ) {
    this.studentForm = this.formBuilder.group({
      ime: ['', Validators.required],
      jmbg: ['', [Validators.required, Validators.minLength(13)]],
      brojIndeksa: ['', Validators.required, Validators.minLength(13)],
      datumUpisa: [''],
      godina: [''],
      predmeti: this.formBuilder.array([]),
      fakultet: ['']
    });

    this.ucitajFakultete();
    this.ucitajPredmete();
  }

  ucitajFakultete(): void {
    this.fakultetService.getAll().subscribe({
      next: data => this.fakulteti = data,
      error: err => console.error("Greska pri ucitavanju fakulteta ", err)
    });
  }

  ucitajPredmete(): void {
    this.predmetService.getAll().subscribe({
      next: data => this.predmetiLista = data,
      error: err => console.error("Greška pri učitavanju predmeta", err)
    });
  }

  onCheckboxChange(event: any){
    const predmetiFormArray = this.studentForm.get('predmeti') as any;

    if (event.target.checked) {
      predmetiFormArray.push(this.formBuilder.control(event.target.value));
    } else {
      const index = predmetiFormArray.controls.findIndex(
        (x: any) => x.value === event.target.value
      );

      predmetiFormArray.removeAt(index);
    }
  }

  kreirajStudenta(): void {
    if (this.studentForm.valid) {
      const student: Student = this.studentForm.value;

      this.studentService.createStudent(student).subscribe({
        next: () => {
          alert("Novi student je uspesno kreiran.");
          this.studentForm.reset();
        },
        error: (err) => console.error("Greska pri kreiranju studenta: ", err)
      });
    } else {
      alert('Forma nije validna. Proverite polja.');
    }
  }

}
