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


  it('buscar usuarios de la API', (done) => {
    const Users = [
      { id: 1, username: 'user1' },
      { id: 2, username: 'user2' },
    ];

    service.getUsers().then((users) => {
      expect(users).toEqual(Users);
      done();
    });

    const req = httpTestingController.expectOne('http://localhost:3000/api/users');
    expect(req.request.method).toBe('GET');
    req.flush(Users);
  });

  it('recuperar usuarios en estado "esperando" de la API', (done) => {
    const UsersEsperando = [
      {
        id: 7,
        nombres: 'Juan',
        apellidos: 'Pérez',
        estado: 'esperando',
      },
      {
        id: 8,
        nombres: 'María',
        apellidos: 'González',
        estado: 'esperando',
      },
    ];
    
    service.getUserEsperando().then((users) => {
      expect(users).toEqual(UsersEsperando);
      done();
    });

    const req = httpTestingController.expectOne('http://localhost:3000/api/users/estado/esperando');
    expect(req.request.method).toBe('GET');
    req.flush(UsersEsperando);
  });

  it('buscar un usuario por ID de la API', (done) => {
    const UserId = 1;
    const Usuario = {
      id: UserId,
      nombres: 'John',
      apellidos: 'Doe',
      cedula: '1234567890',
      email: 'john@example.com',
      telefono: '555-123-4567',
      direccion: '123 Main St',
      genero: 'Masculino',
      vehiculoarentar: 'Sí',
      costos: '100',
      estado: 'activo',
    };

    service.traerPorId(UserId).then((user) => {
      expect(user).toEqual(Usuario);
      done();
    });

    const req = httpTestingController.expectOne(`http://localhost:3000/api/users/${UserId}`);
    expect(req.request.method).toBe('GET');
    req.flush(Usuario);
  });

  it('actualizar un usuario en la API', (done) => {
    const UserId = 1;
    const UserUpdate = {
      nombres: 'Kevin',
      apellidos: 'Paute',
    };

    service.aceptarUsuarios(UserId, UserUpdate).then((response) => {
      expect(response).toBeTruthy();
      done();
    });

    const req = httpTestingController.expectOne(`http://localhost:3000/api/users/${UserId}`);
    expect(req.request.method).toBe('PUT');
    req.flush({});
  });

  it('recuperar usuarios en estado "activo" de la API', (done) => {
    const dummyUsersActivo = [
      {
        id: 1,
        nombres: 'Juan',
        apellidos: 'Pérez',
        estado: 'activo',
      },
      {
        id: 2,
        nombres: 'María',
        apellidos: 'Gómez',
        estado: 'activo',
      },
      {
        id: 3,
        nombres: 'Pedro',
        apellidos: 'López',
        estado: 'activo',
      },
    ];

    service.getUserActivo().then((users) => {
      expect(users).toEqual(dummyUsersActivo);
      done();
    });

    const req = httpTestingController.expectOne('http://localhost:3000/api/users/estado/activo');
    expect(req.request.method).toBe('GET');
    req.flush(dummyUsersActivo);
  });

  it('recuperar usuarios en estado "inactivo" de la API', (done) => {
    const dummyUsersInactivo = [
      {
        id: 4,
        nombres: 'Laura',
        apellidos: 'Martínez',
        estado: 'inactivo',
      },
      {
        id: 5,
        nombres: 'Carlos',
        apellidos: 'García',
        estado: 'inactivo',
      },
      {
        id: 6,
        nombres: 'Ana',
        apellidos: 'López',
        estado: 'inactivo',
      },
    ];

    service.getUserInactivo().then((users) => {
      expect(users).toEqual(dummyUsersInactivo);
      done();
    });

    const req = httpTestingController.expectOne('http://localhost:3000/api/users/estado/inactivo');
    expect(req.request.method).toBe('GET');
    req.flush(dummyUsersInactivo);
  });


});
