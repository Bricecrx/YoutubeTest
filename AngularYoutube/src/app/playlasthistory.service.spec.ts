import { TestBed } from '@angular/core/testing';

import { PlaylasthistoryService } from './playlasthistory.service';

describe('PlaylasthistoryService', () => {
  let service: PlaylasthistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaylasthistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
