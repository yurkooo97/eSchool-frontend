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
      'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJnQnVibGlrMjMiLCJSb2xlcyI6eyJhdXRob3JpdHkiOiJST0xFX1RFQUNIRVIifSwiZXhwIjoxNTQyMTUyMzg2LCJpYXQiOjE1NDIxNDg3ODYsImp0aSI6IjExIn0.z3wq4cXEZqxJbo-gJCPF8HyJjyRxwgSG_wUxUJYM76Vu6qSVARYzx-nqC_xTxjZWNZjnR-wOJWlBUI3bBi39gg'})};

  getJournals(): Observable<Journal[]> {
    return this.http.get<Journal[]>(this.journalUrl, this.httpOptions);
  }

}
