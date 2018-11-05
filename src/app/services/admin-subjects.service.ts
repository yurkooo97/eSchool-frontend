import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AdminSubjectsService {
  private httpOptions = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Methods':'PUT',
      "Access-Control-Allow-Headers": "accept, content-type"
    })
  };
  private url = 'https://fierce-shore-32592.herokuapp.com/subjects';
  constructor(private _http:HttpClient) { }


  public getSubjectsList(){
    return this._http.get(this.url);
  }

  public postSubject (subject) { 
    return this._http.post(this.url, subject);
  }

  public putSubject (subject) { 
    return this._http.put(`${this.url}/${subject.subjectId}`, subject, this.httpOptions);
  }
  
  public deleteSubject (subject) { 
    return this._http.delete(`${this.url}/${subject.subjectId}`, subject);
  }
}