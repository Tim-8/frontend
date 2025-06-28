import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NastavnikMenuComponent } from './nastavnik-menu.component';

describe('NastavnikMenuComponent', () => {
  let component: NastavnikMenuComponent;
  let fixture: ComponentFixture<NastavnikMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NastavnikMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NastavnikMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
