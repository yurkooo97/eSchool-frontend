import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Group } from '../models/group.model';
import { ClassId } from '../models/classId.model';
import { NewGroup } from '../models/transitional-groups.model';

@Injectable({
  providedIn: 'root'
})
export class NewStudingYearService {
  constructor(private http: HttpClient) { }
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getGroups(): Observable<NewGroup[]> {
    return this.http
      .get<NewGroup[]>('classes', this.httpOptions)
      .map((response: any) => {
        return response.data;
      })
      .catch((error: any) => {
        return throwError(error);
      });
  }
  postNewGroups(): Observable<any> {
    return this.http
      .post<any>('students/transition', this.httpOptions)
      .map((response: any) => {
        return response.data;
      })
      .catch((error: any) => {
        return throwError(error);
      });
  }
  putNewOldId(idObject: any[]): Observable<any[]> {
    return this.http
      .put<any[]>('students/transition', idObject)
      .map((response: any) => {
        return response.data;
      })
      .catch((error: any) => {
        return throwError(error);
      });
  }
}
