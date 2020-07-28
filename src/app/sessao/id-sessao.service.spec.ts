import { TestBed } from '@angular/core/testing';

import { IdSessaoService } from './id-sessao.service';

describe('IdSessaoService', () => {
  let service: IdSessaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdSessaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
