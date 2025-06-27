import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { StudijskiProgramFormaComponent } from '../studijski-program-forma/studijski-program-forma.component';
import { StudijskiProgramTabelaComponent } from '../studijski-program-tabela/studijski-program-tabela.component';
import { StudijskiProgram } from '../../../model/studijskiProgram';

@Component({
  selector: 'app-studijski-program-stranica',
  imports: [CommonModule, StudijskiProgramFormaComponent, StudijskiProgramTabelaComponent],
  templateUrl: './studijski-program-stranica.component.html',
  styleUrl: './studijski-program-stranica.component.css'
})
export class StudijskiProgramStranicaComponent {
  @Input() studijskiProgrami: StudijskiProgram[] =[]
  spZaIzmenu?: StudijskiProgram;

  odabraniStudijskiProgram(sp: StudijskiProgram): void {
    this.spZaIzmenu = sp;
  }
}
