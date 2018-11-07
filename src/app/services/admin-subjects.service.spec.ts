import { TestBed } from '@angular/core/testing';

import { AdminSubjectsService } from './admin-subjects.service';

describe('AdminSubjectsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminSubjectsService = TestBed.get(AdminSubjectsService);
    expect(service).toBeTruthy();
  });
});
