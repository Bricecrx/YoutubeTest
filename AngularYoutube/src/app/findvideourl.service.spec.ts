import { TestBed } from '@angular/core/testing';

import { FindvideourlService } from './findvideourl.service';

describe('FindvideourlService', () => {
  let service: FindvideourlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindvideourlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
