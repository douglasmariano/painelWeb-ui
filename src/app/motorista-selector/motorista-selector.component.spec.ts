import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotoristaSelectorComponent } from './motorista-selector.component';

describe('MotoristaSelectorComponent', () => {
  let component: MotoristaSelectorComponent;
  let fixture: ComponentFixture<MotoristaSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotoristaSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MotoristaSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
