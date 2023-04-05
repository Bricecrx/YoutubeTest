import { TestBed } from '@angular/core/testing';

import { PotentiallyaddurlService } from './potentiallyaddurl.service';

describe('PotentiallyaddurlService', () => {
  let service: PotentiallyaddurlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PotentiallyaddurlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
