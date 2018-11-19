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
      'Access-Control-Allow-Headers': 'accept, content-type'
    })
  };

  private classesUrl = 'https://fierce-shore-32592.herokuapp.com/classes';
  private studentsUrl = 'https://fierce-shore-32592.herokuapp.com/students';
  private studentByClassUrl = 'https://fierce-shore-32592.herokuapp.com/students/classes/';

  constructor (private http: HttpClient) { }

  public getClasses(): Observable<Class_[]> {
    return this.http.get<Class_[]>(this.classesUrl, this.httpOptions);
  }

  public getStudents(idClass): Observable<Student[]> {
    return this.http.get<Student[]>(this.studentByClassUrl + idClass, this.httpOptions);
  }

  public addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.studentsUrl, student, this.httpOptions);
  }

  public changeStudent(student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.studentsUrl}/${student.id}`, student, this.httpOptions);
  }
}
