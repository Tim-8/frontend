import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FakultetService } from '../services/fakultet.service';
import { Fakultet } from '../model/fakultet';

@Component({
  selector: 'app-homepage',
  imports: [CommonModule, RouterModule, NgFor],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  @Input() title: string = 'Default Title';
  @Input() subtitle: string = 'Default Subtitle';
  @Input() backgroundUrl: string = "'/assets/images/image1.jpg'";

  fakulteti: Fakultet[] = [];

  constructor(private fakultetService: FakultetService) { } 

  ngOnInit() {
    this.fakultetService.getAllFakulteti().subscribe( 
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
