import { TestBed } from '@angular/core/testing';

import { NewStudingYearService } from './new-studing-year.service';

describe('NewStudingYearService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewStudingYearService = TestBed.get(NewStudingYearService);
    expect(service).toBeTruthy();
  });
});
