import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  imports: [CommonModule, NgIf],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  prikazaniSadrzaj : string = "detalji";

  constructor(private router: Router) {}

  prikaziSadrzaj(sadrzaj : string): void {
    this.prikazaniSadrzaj = sadrzaj;
  }

  registrujSe(): void {
    this.router.navigate(['/registracija'])
  }

  prijaviSe(): void {
    this.router.navigate(['/prijava']);
  }
}
