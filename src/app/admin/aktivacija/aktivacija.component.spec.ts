import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AktivacijaComponent } from './aktivacija.component';

describe('AktivacijaComponent', () => {
  let component: AktivacijaComponent;
  let fixture: ComponentFixture<AktivacijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AktivacijaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AktivacijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
