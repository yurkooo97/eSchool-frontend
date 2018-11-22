import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Group } from '../models/group.model';

@Injectable({
  providedIn: 'root'
})
export class NewStudingYearService {

  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({ 
      /* 'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Methods':'GET,POST,PUT,DELETE',
      "Access-Control-Allow-Headers": "accept, content-type" */
      'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsIlJvbGVzIjp7ImF1dGhvcml0eSI6IlJPTEVfQURNSU4ifSwiZXhwIjoxNTQyMzczMzMyLCJpYXQiOjE1NDIzNjk3MzIsImp0aSI6IjIzMSJ9.TWpyhlk5J539ySu1Wf1SJ5A47xzYnXjMYENLUCvYRHJ5BgXwdPILnfndyiUpJ5kwkzaOLJMQw2Tf6q_6OWUtfg'
    })
  };

  private classUrl = 'https://fierce-shore-32592.herokuapp.com/classes';

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(this.classUrl, this.httpOptions);
  }
}
