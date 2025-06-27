import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-zvanje-forma',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './zvanje-forma.component.html',
  styleUrl: './zvanje-forma.component.css'
})
export class ZvanjeFormaComponent {
  @Input() zvanjeForm!: FormGroup;

  constructor(
     private formBuilder: FormBuilder
  ) {
    this.zvanjeForm = this.formBuilder.group ({
      datumIzbora: ['', [Validators.required]],
      datumPrestanka: ['', [Validators.required]],
      tipZvanja: ['', [Validators.required]],
      naucnaOblast: ['', [Validators.required]],
    })
  }
}
