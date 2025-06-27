import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudijskiProgramTabelaComponent } from './studijski-program-tabela.component';

describe('StudijskiProgramTabelaComponent', () => {
  let component: StudijskiProgramTabelaComponent;
  let fixture: ComponentFixture<StudijskiProgramTabelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudijskiProgramTabelaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudijskiProgramTabelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
