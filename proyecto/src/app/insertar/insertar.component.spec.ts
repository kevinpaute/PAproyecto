import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { InsertarComponent } from './insertar.component';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../usuario.service';

describe('InsertarComponent', () => {
  let component: InsertarComponent;
  let fixture: ComponentFixture<InsertarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InsertarComponent],
      providers: [
        UsuarioService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { id: '1' } // Proporciona aquí el valor que desees para 'id'
            }
          }
        }
      ],
      imports: [RouterTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [InsertarComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(InsertarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
