import { TestBed } from '@angular/core/testing';

import { UrlgestionService } from './urlgestion.service';

describe('UrlgestionService', () => {
  let service: UrlgestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlgestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
