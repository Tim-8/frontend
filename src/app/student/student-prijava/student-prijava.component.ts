import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { PohadjanjePredmeta } from '../../model/pohadjanjePredmeta';
import { Predmet } from '../../model/predmet';

@Component({
  selector: 'app-student-exam-registration',
  templateUrl: './student-exam-registration.component.html',
  styleUrls: ['./student-exam-registration.component.css']
})
export class StudentPrijavaComponent implements OnInit {

  aktivniPredmeti: Predmet[] = [];
  uspesnaPrijava = false;
  greska: string = '';
  studentId = 1; //kasnije iz tokena

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.ucitajAktivnePredmete();
  }

  ucitajAktivnePredmete(): void {
    this.studentService.getPohadjanja(this.studentId).subscribe({
      next: pohadjanja => {
        this.aktivniPredmeti = pohadjanja
          .filter(p => !p.konacnaOcena || p.konacnaOcena === 0) // nisu položeni
          .map(p => p.predmet);
      },
      error: err => {
        console.error(err);
        this.greska = 'Greška pri učitavanju predmeta za prijavu ispita.';
      }
    });
  }

  prijavi(predmetId: number): void {
    this.uspesnaPrijava = false;
    this.greska = '';

    this.studentService.prijaviIspit(this.studentId, predmetId).subscribe({
      next: () => this.uspesnaPrijava = true,
      error: err => {
        this.greska = err.error?.message || 'Greška pri prijavi ispita.';
      }
    });
  }
}
