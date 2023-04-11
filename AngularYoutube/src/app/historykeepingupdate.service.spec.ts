import { TestBed } from '@angular/core/testing';

import { HistorykeepingupdateService } from './historykeepingupdate.service';

describe('HistorykeepingupdateService', () => {
  let service: HistorykeepingupdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistorykeepingupdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
