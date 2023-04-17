import { TestBed } from '@angular/core/testing';

import { HistorygestionService } from './historygestion.service';

describe('HistorygestionService', () => {
  let service: HistorygestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistorygestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
