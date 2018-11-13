import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Student } from '../models/students.model';
import { Class_ } from '../models/classesForStudents.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      'Access-Control-Allow-Headers': 'accept, content-type',
      'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsIlJvbGVzIjp7ImF1dGhvcml0eSI6IlJPTEVfQURNSU4ifSwiZXhwIjoxNTQyMTM5NDkyLCJpYXQiOjE1NDIxMzU4OTIsImp0aSI6IjIzMSJ9.loNuDs3MJI5hcVPVNnCggr9KcBJDW07XYnb17eIbB4oVJ5BMdhBziX8ZQizw6h7qifg1jcL16Xcn_WQofRm49w'
    })
  };

  private classesUrl = 'https://fierce-shore-32592.herokuapp.com/classes';
  private studentsUrl = 'https://fierce-shore-32592.herokuapp.com/students';
  private studentByClassUrl = 'https://fierce-shore-32592.herokuapp.com/students/classes/';

  constructor (private http: HttpClient) { }

  getClasses() {
    return this.http.get<Class_[]>(this.classesUrl, this.httpOptions);
  }

  getStudents(idClass): Observable<Student[]> {
    return this.http.get<Student[]>(this.studentByClassUrl + idClass, this.httpOptions);
  }

  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.studentsUrl, student, this.httpOptions);
  }

  changeStudent(student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.studentsUrl}/${student.id}`, student, this.httpOptions);
  }
}
