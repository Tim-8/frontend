import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsobljeDashboardComponent } from './osoblje-dashboard.component';

describe('OsobljeDashboardComponent', () => {
  let component: OsobljeDashboardComponent;
  let fixture: ComponentFixture<OsobljeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OsobljeDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OsobljeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
