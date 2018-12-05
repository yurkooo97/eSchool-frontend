import { Injectable } from '@angular/core';
import { Marks } from '../models/marks.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MarksService {

  constructor(private http: HttpClient) { }


  public getMarks(mark: Marks): Observable<any[]> {
    return this.http.get<any>(`marks?student_id=${mark.student_id}&class_id=${mark.class_id}&subject_id=${mark.subject_id}
    &start=${mark.start}&end=${mark.end}`)
      .map(response => response.data);
  }
}
