import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UsuarioService } from './usuario.service';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsuarioService],
    });
    service = TestBed.inject(UsuarioService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should fetch users from the API', (done) => {
    const dummyUsers = [
      { id: 1, username: 'user1' },
      { id: 2, username: 'user2' },
      // Agrega más datos ficticios aquí según la estructura de tu respuesta HTTP.
    ];

    service.getUsers().then((users) => {
      expect(users).toEqual(dummyUsers);
      done();
    });

    const req = httpTestingController.expectOne('http://localhost:3000/api/users');
    expect(req.request.method).toBe('GET');
    req.flush(dummyUsers);
  });


});
