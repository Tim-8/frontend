import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsobljeMenuComponent } from './osoblje-menu.component';

describe('OsobljeMenuComponent', () => {
  let component: OsobljeMenuComponent;
  let fixture: ComponentFixture<OsobljeMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OsobljeMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OsobljeMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
