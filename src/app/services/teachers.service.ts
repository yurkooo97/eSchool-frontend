import { Injectable } from "@angular/core";
import { HttpClient} from "@angular/common/http";
import { Iteachers } from "../models/teachers";
import { Observable } from "rxjs";

@Injectable()
export class TeachersService {
  private url = "https://fierce-shore-32592.herokuapp.com/teachers";
  constructor(private http: HttpClient) {}
  public getTeachers(): Observable<Iteachers[]> {
    return this.http.get<Iteachers[]>(this.url);
  }
  public postTeacher(teacher: Iteachers): Observable<Iteachers> {
    return this.http.post<Iteachers>(this.url, teacher);
  }
  public putTeacher(teacher: Iteachers): Observable<Iteachers> {
    return this.http.put<Iteachers>(
      `${this.url}/${teacher.login}`,
      teacher
    );
  }
}
