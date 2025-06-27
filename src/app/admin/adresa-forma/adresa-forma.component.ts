import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-adresa-forma',
  imports: [CommonModule, ReactiveFormsModule,],
  templateUrl: './adresa-forma.component.html',
  styleUrl: './adresa-forma.component.css'
})
export class AdresaFormaComponent {
  @Input() adresaForm!: FormGroup;

  constructor() {}
}
