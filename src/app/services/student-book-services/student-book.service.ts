import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Diary } from 'src/app/models/student-book-models/Diary.model';
import { WeekSchedule } from 'src/app/models/student-book-models/WeekSchedule.model';
@Injectable({
  providedIn: 'root'
})
export class StudentBookService {
  constructor(private _http: HttpClient) {}

  private months = [
    'Січня',
    'Лютого',
    'Березня',
    'Квітня',
    'Травня',
    'Червня',
    'Липня',
    'Серпня',
    'Вересня',
    'Жовтня',
    'Листопада',
    'Грудня'
  ];

  private dayOfWeek = [
    'Понеділок',
    'Вівторок',
    'Середа',
    'Четвер',
    'П\'ятниця',
    'Субота'
  ];

  private getFormattedMonday(date: Date = new Date()): string {
    const day = date.getDay(),
      diff = date.getDate() - day + 1;
    const monday = new Date(date.setDate(diff));
    const mondayMonth =
      monday.getMonth() + 1 < 10
        ? `0${monday.getMonth() + 1}`
        : monday.getMonth() + 1;
    const mondayDate =
      monday.getDate() < 10 ? `0${monday.getDate()}` : monday.getDate();
    return `${monday.getFullYear()}-${mondayMonth}-${mondayDate}`;
  }

  private sortDataByWeekDay(data: Diary[]): WeekSchedule[] {
    let arr = [];
    const sortedArray = [];
    for (let i = 0; i < this.dayOfWeek.length; i++) {
      data.forEach(el => {
        const currDate = new Date(el.date.join('-')).getDay() - 1;
        if (currDate === i) {
          arr.push(el);
        }
      });
      if (arr.length) {
        sortedArray.push({
          dayOfWeek: this.dayOfWeek[i],
          daySchedule: arr,
          dayDate: new Date(arr[0].date),
          dayUkrDate: this.convertedDate(arr[0])
        });
      }
      arr = [];
    }
    return sortedArray;
  }

  private convertedDate(data: Diary): string {
    const day = new Date(data.date.join('-')).getDate();
    const month = this.months[new Date(data.date.join('-')).getMonth()];
    const year = new Date(data.date.join('-')).getFullYear();
    return `${day} ${month} ${year}`;
  }

  public getDiariesList(date?: Date): Observable<WeekSchedule[]> {
    const formattedDate = this.getFormattedMonday(date);
    return this._http
      .get<any>(`/diaries?weekStartDate=${formattedDate}`)
      .map(response => {
        if (response.data.length) {
          const sortedWeekData = this.sortDataByWeekDay(response.data);
          return [...sortedWeekData];
        } else {
          throw new Error('Data didn\'t come');
        }
      });
  }
}
