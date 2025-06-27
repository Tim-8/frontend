import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IzmeniComponent } from './izmeni.component';

describe('IzmeniComponent', () => {
  let component: IzmeniComponent;
  let fixture: ComponentFixture<IzmeniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IzmeniComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IzmeniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
