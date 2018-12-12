import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  public showToasts = new Subject<Object>();
  public notify(severity: string, summary: string, detail: string, sticky?: boolean): void {
    this.showToasts.next({ severity, summary, detail, sticky });
  }
}
