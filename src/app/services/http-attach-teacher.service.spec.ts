import { TestBed } from '@angular/core/testing';

import { HttpAttachTeacherService } from './http-attach-teacher.service';

describe('HttpAttachTeacherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpAttachTeacherService = TestBed.get(HttpAttachTeacherService);
    expect(service).toBeTruthy();
  });
});
