import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FakultetTabelaComponent } from './fakultet-tabela.component';

describe('FakultetTabelaComponent', () => {
  let component: FakultetTabelaComponent;
  let fixture: ComponentFixture<FakultetTabelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FakultetTabelaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FakultetTabelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
