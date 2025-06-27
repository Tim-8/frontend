import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { PohadjanjePredmeta } from '../../model/pohadjanjePredmeta';
import { Obavestenje } from '../../model/obavestenje';

@Component({
  selector: 'app-student-pregled',
  templateUrl: './student-pregled.component.html',
  styleUrls: ['./student-pregled.component.css']
})
export class StudentPregledComponent implements OnInit {

  pohadjanja: PohadjanjePredmeta[] = [];
  obavestenja: Obavestenje[] = [];

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    const studentId = 1; // privremeno

    this.studentService.getPohadjanja(studentId).subscribe({
      next: data => this.pohadjanja = data,
      error: err => console.error('Greska u dohvatanju pohadjanja', err)
    });

    this.studentService.getObavestenja(studentId).subscribe({
      next: data => this.obavestenja = data,
      error: err => console.error('Greska u dohvatanju obavestenja', err)
    });
  }
}
