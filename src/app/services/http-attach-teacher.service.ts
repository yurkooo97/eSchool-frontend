import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Teacher } from '../models/teacher.model';
import { Subject } from '../models/subjects.model';
import { Group } from '../models/group.model';
import { AttachedTeacher } from '../models/attached-teacher.model';

@Injectable({
  providedIn: 'root'
})
export class HttpAttachTeacherService {
  private jwtToken = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsIlJvbGVzIjp7ImF1dGhvcml0eSI6IlJPTEVfQURNSU4ifSwiZXhwIjoxNTQyMTQ4NDI2LCJpYXQiOjE1NDIxNDQ4MjYsImp0aSI6IjIzMSJ9.PhrQhbtgCdZIll4CkjkXFjNuoSpXbLVbBCNd-kxvPiG35DY_dBAHCLcXwNSebwOKYcMqcHc1-jLyEOt9dcxMWg'
    })
  };
  private urlTeachers = 'https://fierce-shore-32592.herokuapp.com/teachers';
  private urlSubjects = 'https://fierce-shore-32592.herokuapp.com/subjects';
  private urlClases = 'https://fierce-shore-32592.herokuapp.com/classes';

  constructor(private http: HttpClient) { }

  getTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.urlTeachers, this.jwtToken);
  }
  getSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.urlSubjects, this.jwtToken);
  }
  getClasses(): Observable<Group[]> {
    return this.http.get<Group[]>(this.urlClases, this.jwtToken);
  }
  postAttachTeacher (object: AttachedTeacher): Observable<any> {
    return this.http.post<any>(`${this.urlTeachers}/${object.teacherId}/classes/${object.classId}/subjects/${object.subjectId}/journal`, object, this.jwtToken);
  }
}


