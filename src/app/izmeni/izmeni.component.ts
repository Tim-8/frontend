import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministratorService } from '../services/administrator.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-izmeni',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './izmeni.component.html',
  styleUrl: './izmeni.component.css'
})
export class IzmeniComponent {
 izmeniForm: FormGroup;
  loggedUserId!: number;  

  constructor(
    private formBuilder: FormBuilder,
    private administratorService: AdministratorService
  ) {
     this.izmeniForm = this.formBuilder.group({
      korisnickoIme: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      lozinka: [''],
      potvrdaLozinke: ['']
    }, { Validators: this.potvrdaLozinkeValidator });
  }
  
  ngOnInit() {
     this.administratorService.getLoggedUser().subscribe(korisnik => {    
      this.loggedUserId = korisnik.id;

      this.izmeniForm.patchValue({
        korisnickoIme: korisnik.korisnickoIme,
        email: korisnik.email,
        lozinka: ''
      });
    });
  }

  potvrdaLozinkeValidator(form: FormGroup) {
    const lozinka = form.get('lozinka')?.value;
    const potvrdaLozinke = form.get('potvrdaLozinke')?.value;
    return lozinka === potvrdaLozinke ? null : { lozinkeSeNePodudaraju: true };
  }

  izmeni() {
    if (this.izmeniForm.valid) {
      const updatedUser = this.izmeniForm.value;
      
      if (!updatedUser.lozinka) {
        delete updatedUser.lozinka;
      }

      this.administratorService.updateUser(this.loggedUserId, updatedUser).subscribe({
        next: () => alert('Podaci uspešno izmenjeni.'),
        error: () => alert('Greška prilikom izmene.'),
      });
    } else {
      alert('Forma nije validna. Proverite polja.');
    }
  }
}
