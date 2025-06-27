import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-raspored-nastave',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './raspored-nastave.component.html',
  styleUrl: './raspored-nastave.component.css'
})
export class RasporedNastaveComponent {
  rasporedNastaveForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.rasporedNastaveForm = this.fb.group({

    })
  }

  dodajRaspored() {}

}
