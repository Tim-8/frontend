import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Student } from '../../../model/student';
import { MenuToggleService } from '../../../services/menu-toggle.service';
import { StudentService } from '../../../services/student.service';

@Component({
  selector: 'app-pregled-studenata',
  imports: [CommonModule],
  templateUrl: './pregled-studenata.component.html',
  styleUrl: './pregled-studenata.component.css'
})
export class PregledStudenataComponent {
  studenti: Student[] = [];

  constructor(
    private menuToggleService: MenuToggleService, 
    private studentService: StudentService 
  ) {}

  onSomeAction() {
    this.menuToggleService.toggleMenu();
  }

  ngOnInit(): void {
    this.ucitajStudente;
  }

  ucitajStudente(): void {
    this.studentService.getAll().subscribe({
      next: (data) => this.studenti = data,
      error: (err) => console.error("Greska pri ucitavanju studenata: ", err)
    })
  }
}
