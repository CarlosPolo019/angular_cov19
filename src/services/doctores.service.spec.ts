import { TestBed } from '@angular/core/testing';

import { DoctoresApiService } from './doctores.service';

describe('DoctoresApiService', () => {
  let service: DoctoresApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctoresApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
