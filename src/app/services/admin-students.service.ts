import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../models/students.model';
import { Class_ } from '../models/classesForStudents.model';
import { Observable } from 'rxjs';

@Injectable()
export class StudentsService {

  constructor (private http: HttpClient) { }

  public getClasses(): Observable<Class_[]> {
    return this.http.get<Class_[]>('classes').map((response: any) => {
      return response.data;
    });
  }

  public getStudents(idClass): Observable<Student[]> {
    return this.http.get<Student[]>('students/classes/' + idClass).map((response: any) => {
      return response.data;
    });
  }

  public addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>('students', student).map((response: any) => {
      return response.data;
    });
  }

  public changeStudent(student: Student): Observable<Student> {
    return this.http.put<Student>(`/admin/students/${student.id}`, student).map((response: any) => {
      return response.data;
    });
  }
}
