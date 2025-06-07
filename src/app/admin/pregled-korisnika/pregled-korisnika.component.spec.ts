import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledKorisnikaComponent } from './pregled-korisnika.component';

describe('PregledKorisnikaComponent', () => {
  let component: PregledKorisnikaComponent;
  let fixture: ComponentFixture<PregledKorisnikaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PregledKorisnikaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PregledKorisnikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
