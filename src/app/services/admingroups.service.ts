import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Group } from '../models/group.model';
import { catchError, map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { forkJoin } from 'rxjs';
import { isString, isNumber } from 'util';



@Injectable()
export class AdmingroupsService {

  private ClassesUrl = 'https://fierce-shore-32592.herokuapp.com/classes';

  constructor(private http: HttpClient) { }

  public getClasses(): Observable<Group[]> {

    return this.http.get<Group[]>(this.ClassesUrl)
      .map((response: any) => {
        return response.data;

      }).pipe(
        catchError(this.handleError)
      );
  }

  public saveClass(group: Group): Observable<Group> {
    if (isNumber(group.id)) {
      return this.http.put<Group>(`${this.ClassesUrl}/${group.id}`, group)
        .pipe(
          catchError(this.handleError)
        );
    } else {
      return this.http.post<Group>(this.ClassesUrl, group)
        .pipe(
          catchError(this.handleError)
        );
    }
  }

  public postClasses(group: Group): Observable<Group> {
    return this.http.post<Group>(this.ClassesUrl, group)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        { error: status },
        { error: error }
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
