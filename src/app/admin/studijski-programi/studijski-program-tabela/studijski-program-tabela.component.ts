import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StudijskiProgram } from '../../../model/studijskiProgram';
import { MenuToggleService } from '../../../services/menu-toggle.service';
import { StudijskiProgramService } from '../../../services/studijski-program.service';

@Component({
  selector: 'app-studijski-program-tabela',
  imports: [CommonModule],
  templateUrl: './studijski-program-tabela.component.html',
  styleUrl: './studijski-program-tabela.component.css'
})
export class StudijskiProgramTabelaComponent {
  @Input() studijskiProgrami: StudijskiProgram[] = [];
  @Output() spZaIzmenu = new EventEmitter<StudijskiProgram>();
  
  constructor(
    private menuToggleService: MenuToggleService,
    private studijskiProgramService: StudijskiProgramService
  ) {}

  onSomeAction() {
    this.menuToggleService.toggleMenu();
  }

  ngOnInit(): void {
    this.ucitajStudijskePrograme();
  }

  ucitajStudijskePrograme() {
    this.studijskiProgramService.getAll().subscribe({
      next: (data) => this.studijskiProgrami = data,
      error: (err) => console.error("Greska pri ucitavanju studijskih programa: ", err)
    })
  }

  izmeni(studijskiProgram: StudijskiProgram): void{
    this.spZaIzmenu.emit(studijskiProgram);
  }

  izbrisi(id: number): void {
    this.studijskiProgramService.deleteStudijskiProgram(id).subscribe({
      next: () => this.ucitajStudijskePrograme(),
      error: (err) => console.error("Greška pri brisanju rezervacije:", err)
    });
  }
}
