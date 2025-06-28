import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { PohadjanjePredmeta } from '../../model/pohadjanjePredmeta';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-history.component.html',
  styleUrls: ['./student-history.component.css']
})
export class StudentHistoryComponent implements OnInit {

  istorija: PohadjanjePredmeta[] = [];
  prosecnaOcena: number = 0;
  ukupnoEcts: number = 0;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    const studentId = 1; // dinamički kasnije

    this.studentService.getIstorijaStudiranja(studentId).subscribe({
      next: data => {
        this.istorija = data;
        this.izracunajStatistiku();
      },
      error: err => console.error('Greška pri dohvatanju istorije studiranja', err)
    });
  }

  izracunajStatistiku(): void {
    const polozeni = this.istorija.filter(p => p.konacnaOcena > 5);
    const sumaOcena = polozeni.reduce((sum, p) => sum + p.konacnaOcena, 0);
    const ects = polozeni.reduce((sum, p) => sum + p.predmet.espb, 0);

    this.prosecnaOcena = polozeni.length ? sumaOcena / polozeni.length : 0;
    this.ukupnoEcts = ects;
  }
}
