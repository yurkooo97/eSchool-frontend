import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Iteachers } from './teachers';
import { Observable } from 'rxjs';

@Injectable()
export class TeachersService {
   url:string = "https://fierce-shore-32592.herokuapp.com/teachers"; 
  constructor(private http:HttpClient) { }
  getTeachers():Observable<Iteachers[]>{
    return this.http.get<Iteachers[]>(this.url);
  }
}
