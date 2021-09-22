import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjelEntregaComponent } from './ajel-entrega.component';

describe('AjelEntregaComponent', () => {
  let component: AjelEntregaComponent;
  let fixture: ComponentFixture<AjelEntregaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjelEntregaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjelEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
