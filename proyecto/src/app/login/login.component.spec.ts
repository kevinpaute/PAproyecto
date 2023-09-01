import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { InjectionToken } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const toastConfig: any = {
    // Define aquí tu configuración de Toastr si es necesario
  };
  const ToastConfigToken = new InjectionToken('ToastConfigToken', {
    providedIn: 'root',
    factory: () => toastConfig,
  });

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule, ToastrModule.forRoot()], 
      declarations: [LoginComponent],
      providers: [{ToastrService, provide: ToastConfigToken, useValue: toastConfig }],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
