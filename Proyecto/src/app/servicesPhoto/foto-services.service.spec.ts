import { TestBed } from '@angular/core/testing';

import { FotoServicesService } from './foto-services.service';

describe('FotoServicesService', () => {
  let service: FotoServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FotoServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
