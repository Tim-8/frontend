import { Component, Input } from '@angular/core';
import { FakultetTabelaComponent } from '../fakultet-tabela/fakultet-tabela.component';
import { FakultetFormaComponent } from '../fakultet-forma/fakultet-forma.component';
import { CommonModule } from '@angular/common';
import { Fakultet } from '../../../model/fakultet';

@Component({
  selector: 'app-fakultet-stranica',
  imports: [CommonModule, FakultetFormaComponent, FakultetTabelaComponent ],
  templateUrl: './fakultet-stranica.component.html',
  styleUrl: './fakultet-stranica.component.css'
})
export class FakultetStranicaComponent {
  @Input() fakulteti: Fakultet[] = []
  fakultetZaIzmenu?: Fakultet;

  odabraniFakultetZaIzmenu(fakultet: Fakultet): void {
    this.fakultetZaIzmenu = fakultet;
  }

}
