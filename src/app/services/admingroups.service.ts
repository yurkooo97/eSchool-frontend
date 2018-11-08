import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Group} from '../models/groupModel';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { forkJoin } from 'rxjs';
import { isString, isNumber } from 'util';
import { AuthenticationService} from './authentication.service'

@Injectable()
export class AdmingroupsService {
    
private ClassesUrl = 'https://fierce-shore-32592.herokuapp.com/classes';
  
constructor(private http: HttpClient) { }

public getClasses(): Observable<Group[]> {
  //TODO: remove this spike and use sigle method to load all the classes
  // const active = this.http.get<Group[]>(this.ClassesUrl);
  // const inactive = this.http.get<Group[]>(`${this.ClassesUrl}/inactive`);

  // const allClasses = forkJoin([active, inactive]);// active.pipe(concat(inactive));
  // return allClasses
  //   .map(responses => [].concat(...responses) )
  //   .map(classes => {
  //     classes.forEach(c => {
  //       if (isString(c.isActive)){
  //         c.isActive = c.isActive == 'true';
  //       }
  //     });
  //     return classes;
  //   })
  //   .pipe(
  //     catchError(this.handleError)
  //   );
  
  return this.http.get<Group[]>(this.ClassesUrl)
  // .map(classes => {
  //   classes.forEach(c => {
  //     if (isString(c.isActive)){
  //       c.isActive = c.isActive == 'true';
  //     }
  //   });
  //   return classes;
  // })
    .pipe(
      catchError(this.handleError)
    );
}
    
public saveClass(group:Group) : Observable<Group> {
  if (isNumber(group.id)){
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
};
  
public postClasses(group:Group): Observable<Group> {
    return this.http.post<Group>(this.ClassesUrl, group)
  .pipe(
    catchError(this.handleError)
 )};

  
private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    console.error('An error occurred:', error.error.message);
} else {
    console.error(
      {error:status}, 
      {error:error}
)}
  return throwError('Something bad happened; please try again later.');
 };

}

