import { TestBed } from '@angular/core/testing';

import { DataSharingService } from './data-sharing.service';
import { Subject } from 'rxjs';

describe('DataSharingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataSharingService = TestBed.get(DataSharingService);
    expect(service).toBeTruthy();
  });

  it('should be created showToasts', () => {
    const service: DataSharingService = TestBed.get(DataSharingService);
    expect(service.showToasts).toEqual(new Subject<Object>());
  });

  it('should be call notify', () => {
    const service: DataSharingService = TestBed.get(DataSharingService);
    expect(service.notify('success', 'Успішно виконано', 'Прив\'язку вчителя до журналу'))
      .toEqual(service.showToasts.next({
        severity: 'success',
        summary: 'Успішно виконано',
        detail: 'Прив\'язку вчителя до журналу'
      }));
  });

});
