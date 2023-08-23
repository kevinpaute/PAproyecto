import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertarComponent } from './insertar.component';

describe('InsertarComponent', () => {
  let component: InsertarComponent;
  let fixture: ComponentFixture<InsertarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertarComponent]
    });
    fixture = TestBed.createComponent(InsertarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
