import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FakultetStranicaComponent } from './fakultet-stranica.component';

describe('FakultetStranicaComponent', () => {
  let component: FakultetStranicaComponent;
  let fixture: ComponentFixture<FakultetStranicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FakultetStranicaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FakultetStranicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
