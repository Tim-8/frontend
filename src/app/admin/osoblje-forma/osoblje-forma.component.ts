import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegistrovaniKorisnik } from '../../model/registrovaniKorisnik';
import { OsobljeService } from '../../services/osoblje.service';

@Component({
  selector: 'app-osoblje-forma',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './osoblje-forma.component.html',
  styleUrl: './osoblje-forma.component.css'
})
export class OsobljeFormaComponent {
  osobljeForm: FormGroup;

  @Output()
  noviKorisnik = new EventEmitter<RegistrovaniKorisnik>();

  constructor(
    private formBuilder: FormBuilder,
    private osobljeService: OsobljeService
  ) {
    this.osobljeForm = this.formBuilder.group({
      korisnickoIme: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      lozinka: ['', [Validators.required, Validators.minLength(6)]],
      potvrdaLozinke: ['', Validators.required],
      aktivan: ['']
    }, {
      validators: this.potvrdaLozinkeValidator
    });
  }

  potvrdaLozinkeValidator(form: FormGroup) {
    const lozinka = form.get('lozinka')?.value;
    const potvrdaLozinke = form.get('potvrdaLozinke')?.value;
    return lozinka === potvrdaLozinke ? null : { lozinkeSeNePodudaraju: true };
  }

  sacuvaj() {
    if (this.osobljeForm.valid) {
      let user: RegistrovaniKorisnik;

      user = {
        id: 0,
        korisnickoIme: this.osobljeForm.value.korisnickoIme,
        lozinka: this.osobljeForm.value.lozinka,
        email: this.osobljeForm.value.email,
        aktivan: false
      };

      this.osobljeService.createOsoblje(user).subscribe({
        next: () => {
          alert('Osoblje je uspesno kreirano.');
          this.osobljeForm.reset();
        },
         error: err => {
          console.error('Greška pri kreiranju osoblja:', err);
        }
      });
    } else {
      alert('Forma nije validna. Proverite polja.');
    }
  }
}
