import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  public showToasts = new Subject<Object>();
  public notify(severity: Severities, summary: string, detail: string): void {
    this.showToasts.next({ severity, summary, detail });
  }
}
