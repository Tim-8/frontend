import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPregledComponent } from './student-pregled.component';

describe('StudentPregledComponent', () => {
  let component: StudentPregledComponent;
  let fixture: ComponentFixture<StudentPregledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentPregledComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentPregledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
