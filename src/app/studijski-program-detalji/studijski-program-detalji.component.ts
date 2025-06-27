import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HomepageComponent } from '../homepage/homepage.component';
import { StudijskiProgram } from '../model/studijskiProgram';
import { StudijskiProgramService } from '../services/studijski-program.service';

@Component({
  selector: 'app-studijski-programi-detalji',
  imports: [CommonModule, RouterModule, HomepageComponent],
  templateUrl: './studijski-program-detalji.component.html',
  styleUrl: './studijski-program-detalji.component.css'
})
export class StudijskiProgramDetaljiComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() color: string = '';
  @Input() backgroundUrl: string = '';

  sp: StudijskiProgram | null = null;

  constructor(
    private route: ActivatedRoute,
    private studijskiProgramService: StudijskiProgramService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const studijskiProgramId = Number(params.get('id'));
      if (studijskiProgramId) {
        this.studijskiProgramService.getById(studijskiProgramId).subscribe(
          (data: StudijskiProgram) => {
            this.sp = data;
            this.title = data.naziv;
            this.backgroundUrl = this.ucitajPozadinu(data.naziv);
          }, 
          (error) => {
            console.error('Greška pri učitavanju studijskog programa:', error);
          }
        );
      } else {
        console.error('ID studijskog programa nije pronađen u URL-u.');
        this.router.navigate(['/fakultet/{id}'])
      }
    });
  }

  ucitajPozadinu(naziv: string): string {
    if (naziv.includes('Elektrotehnika')) {
      return '/assets/images/image12.jpg';
    } else if (naziv.includes('Softversko inženjerstvo')) {
      return '/assets/images/image5.jpg';
    } else {
      return '/assets/images/image1.jpg'
    }
  }

  goBack(): void {
    this.router.navigate(['/homepage']); 
  }
}
