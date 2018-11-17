import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Classes } from '../models/class-schedule';

@Injectable()
export class ClassScheduleService {
  
  private ClassesUrl = 'https://fierce-shore-32592.herokuapp.com/classes/';
	
	constructor(private http: HttpClient) {}
  public getClasses(): Observable<Classes[]> {
    return this.http.get<Classes[]>(this.ClassesUrl);
  }
}
