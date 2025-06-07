import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RegistrovaniKorisnik } from '../../model/registrovaniKorisnik';
import { AdministratorService } from '../../services/administrator.service';
import { MenuToggleService } from '../../services/menu-toggle.service';

@Component({
  selector: 'app-aktivacija',
  imports: [CommonModule],
  templateUrl: './aktivacija.component.html',
  styleUrl: './aktivacija.component.css'
})
export class AktivacijaComponent {
  @Input() registrovaniKorisnici: RegistrovaniKorisnik[] = [];

  constructor(
    private menuToggleService: MenuToggleService, 
    private administratorService: AdministratorService
  ) {}

  onSomeAction() {
    this.menuToggleService.toggleMenu();
  }
  
  ngOnInit(): void {
    this.ucitajNeaktivneKorisnike();
  }

  ucitajNeaktivneKorisnike(): void {
    this.administratorService.getUsersByStatus(false).subscribe({
      next: (data) => this.registrovaniKorisnici = data,
      error: (err) => console.error("Greska pri ucitavanju korisnika: ", err)
    })
  }

  aktiviraj(id: number): void {
    this.administratorService.activateUser(id).subscribe({
      next: () => {
        console.log(`Korisnik ${id} aktiviran`);
        this.ucitajNeaktivneKorisnike();  
      },
      error: (err) => console.error("Greška pri aktivaciji:", err)
    });
  }
}
