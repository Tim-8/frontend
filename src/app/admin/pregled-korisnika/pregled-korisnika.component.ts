import { Component, Input } from '@angular/core';
import { RegistrovaniKorisnik } from '../../model/registrovaniKorisnik';
import { MenuToggleService } from '../../services/menu-toggle.service';
import { AdministratorService } from '../../services/administrator.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pregled-korisnika',
  imports: [CommonModule],
  templateUrl: './pregled-korisnika.component.html',
  styleUrl: './pregled-korisnika.component.css'
})
export class PregledKorisnikaComponent {
  @Input() registrovaniKorisnici: RegistrovaniKorisnik[] = [];

  constructor(
    private menuToggleService: MenuToggleService, 
    private administratorService: AdministratorService
  ) {}
  
  onSomeAction() {
    this.menuToggleService.toggleMenu();
  }
  
  ngOnInit(): void {
    this.ucitajKorisnike();
  }

  ucitajKorisnike(): void {
    this.administratorService.getAll().subscribe({
      next: (data) => this.registrovaniKorisnici = data,
      error: (err) => console.error("Greska pri ucitavanju korisnika: ", err)
    })
  }
}
