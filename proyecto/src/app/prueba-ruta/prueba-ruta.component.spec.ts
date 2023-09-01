import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PruebaRutaComponent } from './prueba-ruta.component';

describe('PruebaRutaComponent', () => {
  let component: PruebaRutaComponent;
  let fixture: ComponentFixture<PruebaRutaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PruebaRutaComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(PruebaRutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
