import { Component } from '@angular/core';
import { HomepageComponent } from '../homepage/homepage.component';
import { FakultetService } from '../services/fakultet.service';
import { Fakultet } from '../model/fakultet';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-upis',
  imports: [HomepageComponent, RouterModule],
  templateUrl: './upis.component.html',
  styleUrl: './upis.component.css'
})
export class UpisComponent {
  fakulteti: Fakultet[] = [];

  constructor(private fakultetService: FakultetService) {}

  ngOnInit() {
      this.fakultetService.getAll().subscribe( 
        (data: Fakultet[]) => {
          this.fakulteti = data; 
        },
        (error) => {
          console.error('Greška pri dohvatanju fakulteta:', error);
          this.fakulteti = [];
        }
      );
  }
  
}
