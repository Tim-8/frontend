import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; 

import { CommonModule } from '@angular/common'; 
import { Fakultet } from '../model/fakultet';
import { FakultetService } from '../services/fakultet.service';
import { HomepageComponent } from '../homepage/homepage.component';

@Component({
  selector: 'app-fakultet-detalji',
  imports: [CommonModule, RouterModule, HomepageComponent], 
  templateUrl: './fakultet-detalji.component.html',
  styleUrls: ['./fakultet-detalji.component.css']
})
export class FakultetDetaljiComponent implements OnInit {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() color: string = '';
  @Input() backgroundUrl: string = '';
  
  fakultet: Fakultet | null = null; 

  constructor(
    private route: ActivatedRoute,
    private fakultetService: FakultetService, 
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const fakultetId = Number(params.get('id')); 
      if (fakultetId) {
        this.fakultetService.getFakultetById(fakultetId).subscribe(
          (data: Fakultet) => {
            this.fakultet = data;
            this.title = data.naziv;
            this.backgroundUrl = this.ucitajPozadinu(data.naziv);
          },
          (error) => {
            console.error('Greška pri učitavanju fakulteta:', error);
          }
        );
      } else {
        console.error('ID fakulteta nije pronađen u URL-u.');
        this.router.navigate(['/homepage']);
      }
    });
  }
  
  ucitajPozadinu(naziv: string): string {
    if (naziv.includes('Fakultet tehničkih nauka')) {
      return '/assets/images/image11.jpg';
    } else {
      return '/assets/images/image1.jpg';
    }
  }

  goBack(): void {
    this.router.navigate(['/homepage']); 
  }
}