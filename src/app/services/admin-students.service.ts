import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../models/students.model';
import { Class_ } from '../models/classesForStudents.model';
import { Observable } from 'rxjs';

@Injectable()
export class StudentsService {
  private classesUrl = 'https://fierce-shore-32592.herokuapp.com/classes';
  private studentsUrl = 'https://fierce-shore-32592.herokuapp.com/students';
  private studentByClassUrl = 'https://fierce-shore-32592.herokuapp.com/students/classes/';

  constructor (private http: HttpClient) { }

  public getClasses(): Observable<Class_[]> {
    return this.http.get<Class_[]>(this.classesUrl);
  }

  public getStudents(idClass): Observable<Student[]> {
    return this.http.get<Student[]>(this.studentByClassUrl + idClass);
  }

  public addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.studentsUrl, student);
  }

  public changeStudent(student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.studentsUrl}/${student.id}`, student);
  }
}
