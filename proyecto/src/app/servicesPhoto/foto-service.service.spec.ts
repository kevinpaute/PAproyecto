import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FotoServiceService } from './foto-service.service';

describe('FotoServiceService', () => {
  let service: FotoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Importa HttpClientTestingModule
      providers: [FotoServiceService],
    });
    service = TestBed.inject(FotoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
