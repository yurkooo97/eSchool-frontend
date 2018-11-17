import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from '../models/subjects.model';

@Injectable({
  providedIn: 'root'
})
export class AdminSubjectsService {
  private url = 'https://fierce-shore-32592.herokuapp.com/subjects';

  constructor(private _http: HttpClient) {}

  public getSubjectsList(): Observable<Subject[]> {
    return this._http.get<Subject[]>(this.url);
  }

  public postSubject(subject: Subject): Observable<Subject> {
    return this._http.post<Subject>(this.url, subject);
  }

  public putSubject(subject: Subject): Observable<Subject> {
    return this._http.put<Subject>(`${this.url}/${subject.subjectId}`, subject);
  }
}
