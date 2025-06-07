import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; 

import { CommonModule, NgIf, NgFor } from '@angular/common'; 
import { Fakultet } from '../../model/fakultet';
import { FakultetService } from '../../services/fakultet.service';

@Component({
  selector: 'app-fakultet-detalji',
  templateUrl: './fakultet-detalji.component.html',
  styleUrls: ['./fakultet-detalji.component.css'], 
  standalone: true, 
  imports: [CommonModule, RouterModule, NgIf, NgFor] 
})
export class FakultetDetaljiComponent implements OnInit {
  fakultet: Fakultet | null = null; 

  constructor(
    private route: ActivatedRoute,
    private fakultetService: FakultetService, 
    private router: Router 
  ) { }

  ngOnInit(): void {
    
    this.route.paramMap.subscribe(params => {
      const fakultetId = Number(params.get('id')); 
      if (fakultetId) {
        this.fakultetService.getFakultetById(fakultetId).subscribe(
          (data: Fakultet) => {
            this.fakultet = data; 
          }
        );
      } else {
        console.error('ID fakulteta nije pronađen u URL-u.');
        this.router.navigate(['/fakulteti']);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/homepage']); 
  }
}