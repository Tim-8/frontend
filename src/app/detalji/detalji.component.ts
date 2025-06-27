import { Component } from '@angular/core';
import { HomepageComponent } from '../homepage/homepage.component';
import { CommonModule } from '@angular/common';
import { Univerzitet } from '../model/univerzitet';
import { UniverzitetService } from '../services/univerzitet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalji',
  imports: [HomepageComponent, CommonModule],
  templateUrl: './detalji.component.html',
  styleUrls: ['./detalji.component.css']
})
export class DetaljiComponent {
  univerzitet?: Univerzitet;
  constructor(
    private univerzitetService: UniverzitetService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.univerzitetService.getAll().subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.univerzitet = data[0];
        }
      },
      error: (err) => {
        console.error('Greška pri dohvatanju univerziteta:', err);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/homepage']); 
  }
}
