import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstoqueConferenciaComponent } from './estoque-conferencia.component';

describe('EstoqueConferenciaComponent', () => {
  let component: EstoqueConferenciaComponent;
  let fixture: ComponentFixture<EstoqueConferenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstoqueConferenciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstoqueConferenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
