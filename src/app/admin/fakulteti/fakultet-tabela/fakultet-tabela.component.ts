import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Fakultet } from '../../../model/fakultet';
import { FakultetService } from '../../../services/fakultet.service';
import { MenuToggleService } from '../../../services/menu-toggle.service';

@Component({
  selector: 'app-fakultet-tabela',
  imports: [CommonModule],
  templateUrl: './fakultet-tabela.component.html',
  styleUrl: './fakultet-tabela.component.css'
})
export class FakultetTabelaComponent {
  @Input() fakulteti: Fakultet[] = [];
  @Output() fakultetZaIzmenu: EventEmitter<Fakultet> = new EventEmitter<Fakultet>();

  constructor(
    private menuToggleService: MenuToggleService,
    private fakultetService: FakultetService
  ) {}

  onSomeAction() {
    this.menuToggleService.toggleMenu();
  }

  ngOnInit(): void {
    this.ucitajFakultete();
  }

  ucitajFakultete() {
    this.fakultetService.getAll().subscribe({
      next: (data) => this.fakulteti = data,
      error: (err) => console.error("Greska pri ucitavanju fakulteta: ", err)
    }) 
  }

  izmeni(fakultet: Fakultet): void{
    this.fakultetZaIzmenu.emit(fakultet);
  }

  izbrisi(id: number): void {
    this.fakultetService.deleteFakultet(id).subscribe({
      next: () => this.ucitajFakultete(),
      error: (err) => console.error("Greska pri brisanju fakulteta: ", err)
    })
  }
}
