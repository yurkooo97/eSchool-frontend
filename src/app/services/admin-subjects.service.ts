import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, from} from 'rxjs';
import {Subject} from '../models/subjects.model';

@Injectable({
  providedIn: 'root'
})
export class AdminSubjectsService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE',
      'Access-Control-Allow-Headers': 'accept, content-type'
    })
  };

  private url = 'https://fierce-shore-32592.herokuapp.com/subjects';

  constructor(private _http: HttpClient) { }

  public getSubjectsList(): Observable<Subject[]> {
    return this._http.get<Subject[]>(this.url, this.httpOptions);
  }

  public postSubject (subject: Subject): Observable<Subject> {
    return this._http.post<Subject>(this.url, subject, this.httpOptions);
  }

  public putSubject (subject: Subject): Observable<Subject> {
    return this._http.put<Subject>(`${this.url}/${subject.subjectId}`, subject, this.httpOptions);
  }
}