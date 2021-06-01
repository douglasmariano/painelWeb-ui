import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcaSelectorComponent } from './marca-selector.component';

describe('MarcaSelectorComponent', () => {
  let component: MarcaSelectorComponent;
  let fixture: ComponentFixture<MarcaSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarcaSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcaSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
