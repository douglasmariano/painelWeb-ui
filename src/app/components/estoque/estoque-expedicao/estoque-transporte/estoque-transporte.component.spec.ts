import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstoqueTransporteComponent } from './estoque-transporte.component';

describe('EstoqueTransporteComponent', () => {
  let component: EstoqueTransporteComponent;
  let fixture: ComponentFixture<EstoqueTransporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstoqueTransporteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstoqueTransporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
