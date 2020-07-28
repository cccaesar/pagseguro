import { TestBed } from '@angular/core/testing';

import { GetHashService } from './get-hash.service';

describe('GetHashService', () => {
  let service: GetHashService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetHashService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
