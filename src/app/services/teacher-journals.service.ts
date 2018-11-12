import { Injectable } from '@angular/core';
import { Journal } from '../models/journal.model';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

const teacherId = 1;

@Injectable({
  providedIn: 'root'
})
export class TeacherJournalsService {

  constructor(private http: HttpClient) { }

  public selectedJournal: Observable<Journal>;

  private journalUrl = 'https://fierce-shore-32592.herokuapp.com/journals/teachers/' + teacherId + '/active';
  private httpOptions = { headers: new HttpHeaders( {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE',
      'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJnQnVibGlrMjMiLCJSb2xlcyI6eyJhdXRob3JpdHkiOiJST0xFX1RFQUNIRVIifSwiZXhwIjoxNTQxODgwMTkxLCJpYXQiOjE1NDE4NzY1OTEsImp0aSI6IjExIn0.OiQV_uRnXyQLuE5BXb14kkqYh1IEcea6G7lbHsGwdR-hZsoem3IxzHTxVXmKGf2SBMIAyc8TaoRikzV0XjG2nQ'})};

  getJournals(): Observable<Journal[]> {
    return this.http.get<Journal[]>(this.journalUrl, this.httpOptions);
  }

}
