import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Iteachers } from '../models/teachers';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class TeachersService {
  constructor(private http: HttpClient) {}
  private url = 'https://fierce-shore-32592.herokuapp.com/teachers';
  private calendarSource = new BehaviorSubject<object>({
    firstDayOfWeek: 1,
    dayNames: ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця', 'Субота'],
    dayNamesShort: ['Нед', 'Пон', 'Вів', 'Сер', 'Чет', 'П\'ят', 'Суб'],
    dayNamesMin: ['нд', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
    monthNames: [ 'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень',
     'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень' ],
    monthNamesShort: [ 'Січ', 'Лют', 'Бер', 'Кві', 'Тра', 'Чер', 'Лип', 'Сер', 'Вер', 'Жов', 'Лис', 'Гру' ],
    today: 'Сьогодні',
    clear: 'Clear'
  });
  currentCalendar = this.calendarSource.asObservable();
   public getTeachers(): Observable<Iteachers[]> {
    return this.http.get<Iteachers[]>(this.url)
      .map((response: any) => {
        return response.data;
      });
    }
  public postTeacher(teacher: Iteachers): Observable<Iteachers> {
   return this.http.post<Iteachers>(this.url, teacher)
      .map((response: any) => {
        return response.data;
      });
  }
  public putTeacher(teacher: Iteachers): Observable<Iteachers> {
    return this.http.put<Iteachers>(`${this.url}/${teacher.id}`, teacher)
    .map((response: any) => {
      return response.data;
    });
  }

}
