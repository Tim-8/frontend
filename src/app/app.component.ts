import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegistrovaniKorisnikService } from './services/registrovani-korisnik.service';
import { RegistrovaniKorisnik } from './model/registrovaniKorisnik';
import { RegistracijaComponent } from './registracija/registracija.component';
import { PrijavaComponent } from './prijava/prijava.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RegistracijaComponent, PrijavaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title: string = 'frontend'
  message: string = '';
  constructor(private registrovaniKorisnikService: RegistrovaniKorisnikService) {}
  registrovaniKorisnici: RegistrovaniKorisnik[] = [];
 
  ngOnInit(): void {
     this.dobaviRegistrovaneKorisnike();
  }

  dobaviRegistrovaneKorisnike(): void {
    this.registrovaniKorisnikService.getAll().subscribe(registrovaniKorisnici => {
      this.registrovaniKorisnici = registrovaniKorisnici;
    })
  }
}