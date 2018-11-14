import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Teacher } from '../models/teacher.model';
import { Subject } from '../models/subjects.model';
import { Group } from '../models/group.model';
import { AttachedTeacher } from '../models/attached-teacher.model';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpAttachTeacherService {

  private urlTeachers = 'https://fierce-shore-32592.herokuapp.com/teachers';
  private urlSubjects = 'https://fierce-shore-32592.herokuapp.com/subjects';
  private urlClases = 'https://fierce-shore-32592.herokuapp.com/classes';

  constructor(private http: HttpClient) { }
  // I have some questions
  // getTeachers(): Observable<any> {
  //   return this.http.get<Teacher[]>(this.urlTeachers)
  //   .pipe(
  //     tap(_ => {console.log(_);
  //      const newArray = _.map(function (teacher) {
  //        teacher.fullname = `${teacher.lastname} ${teacher.firstname}`;
  //           return teacher; });
  //           console.log(newArray);
  //      return newArray;
  //     })
  //   );
  // }
  getTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.urlTeachers)
      .pipe(tap(_ => _.map(teacher => teacher.fullname = `${teacher.lastname} ${teacher.firstname}`)));
  }
  getSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.urlSubjects);
  }
  getClasses(): Observable<Group[]> {
    return this.http.get<Group[]>(this.urlClases);
  }
  postAttachTeacher(object: AttachedTeacher): Observable<any> {
    return this.http.post<any>(`${this.urlTeachers}/${object.teacherId}/classes/${object.classId}/subjects/${object.subjectId}/journal`, object);
  }
}
