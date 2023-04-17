import { TestBed } from '@angular/core/testing';

import { FavouritegestionService } from './favouritegestion.service';

describe('FavouritegestionService', () => {
  let service: FavouritegestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavouritegestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
