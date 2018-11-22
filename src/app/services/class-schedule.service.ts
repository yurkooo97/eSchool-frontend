import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Schedule } from '../models/class-schedule';

@Injectable()
export class ClassScheduleService {

  private url = 'https://fierce-shore-32592.herokuapp.com';

  constructor(private http: HttpClient) { }

  public getClasses(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(this.url + '/classes/').map((response: any) => {
      response.data.forEach(item => {
        item.label = item.className;
        item.value = item.id;
      })
      return response.data;
    });
  };

  public getScheduleSubjects(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(this.url + '/subjects/').map((response: any) => {
      response.data.forEach(item => {
        item.label = item.subjectName;
        item.value = item.subjectId;
      })
      return response.data;
    });
  };

  public saveClassSchedule(schedule: Schedule): Observable<Schedule[]> {
    return this.http
      .post<Schedule[]>(this.url, schedule)
  }
}
