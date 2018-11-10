import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Iteachers } from "../models/teachers";
import { Observable } from "rxjs";

@Injectable()
export class TeachersService {
  private httpOptions = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Methods':'GET,POST,PUT,DELETE',
      "Access-Control-Allow-Headers": "accept, content-type"
    })
  };
  private url = "https://fierce-shore-32592.herokuapp.com/teachers";
  constructor(private http: HttpClient) {}
  public getTeachers(): Observable<Iteachers[]> {
    return this.http.get<Iteachers[]>(this.url, this.httpOptions);
  }
  public postTeacher(teacher: Iteachers): Observable<Iteachers> {
    return this.http.post<Iteachers>(this.url, teacher, this.httpOptions);
  }
  public putTeacher(teacher: Iteachers): Observable<Iteachers> {
    return this.http.put<Iteachers>(
      `${this.url}/${teacher.id}`,
      teacher, this.httpOptions
    );
  }
}
