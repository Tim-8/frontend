import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FakultetService } from '../services/fakultet.service';
import { Fakultet } from '../model/fakultet';
import { AuthService } from '../services/auth.service';
import { StudijskiProgramService } from '../services/studijski-program.service';
import { StudijskiProgram } from '../model/studijskiProgram';

@Component({
  selector: 'app-homepage',
  imports: [CommonModule, RouterModule, NgFor],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  @Input() title: string = 'Univerzitet Novi Sad';
  @Input() subtitle: string = '';
  @Input() color: string = '';
  @Input() backgroundUrl: string = '/assets/images/image.jpg';
  
  fakulteti: Fakultet[] = [];
  studijskiProgrami: StudijskiProgram[] = [];
  jePrijavljen : boolean = false;
  
  constructor(
    private fakultetService: FakultetService,
    private studijskiProgramService: StudijskiProgramService,
    private authService: AuthService,
    private router: Router
  ) {} 

  ngOnInit() {
    this.ucitajFakultete();
    this.ucitajStudijskePrograme();

    this.jePrijavljen = this.authService.isLoggedIn();
  }

  ucitajFakultete() {
    this.fakultetService.getAll().subscribe({
      next: data => this.fakulteti = data,
      error: err => console.error("Greska pri ucitavanju fakulteta: ", err)
    });
  }

  ucitajStudijskePrograme() {
    this.studijskiProgramService.getAll().subscribe({
      next: data => this.studijskiProgrami = data,
      error: err => console.error("Greska pri ucitavanju studijskih programa: ", err)
    })
  }

  odjaviSe(): void {
    this.authService.logout();
    this.jePrijavljen = false;
    this.router.navigate(['/homepage']);
  }
}