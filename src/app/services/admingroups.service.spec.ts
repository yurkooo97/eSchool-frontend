import { TestBed } from '@angular/core/testing';

import { AdmingroupsService } from './admingroups.service';

describe('AdmingroupsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdmingroupsService = TestBed.get(AdmingroupsService);
    expect(service).toBeTruthy();
  });
});
