import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudijskiProgramStranicaComponent } from './studijski-program-stranica.component';

describe('StudijskiProgramStranicaComponent', () => {
  let component: StudijskiProgramStranicaComponent;
  let fixture: ComponentFixture<StudijskiProgramStranicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudijskiProgramStranicaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudijskiProgramStranicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
