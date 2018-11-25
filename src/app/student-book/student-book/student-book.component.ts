import { Component, OnInit } from '@angular/core';
import { StudentBookService } from 'src/app/services/student-book-services/student-book.service';
import { MenuItem } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { faListUl } from '@fortawesome/free-solid-svg-icons';
import { faThLarge } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-student-book',
  templateUrl: './student-book.component.html',
  styleUrls: ['./student-book.component.scss']
})
export class StudentBookComponent implements OnInit {
  weekSchedule: Array<any>;

  startAndEndOfWeek: object;

  offset = 0;

  menuItems: MenuItem[];

  cols;

  notFound: string;

  scheduleOptions: SelectItem[];

  view = false;

  faListUl = faListUl;

  faThLarge = faThLarge;

  icon = faListUl;

  selectedType = 'week';

  constructor(private studentBookService: StudentBookService) {}

  ngOnInit() {
    this.studentBookService.getDiariesList().subscribe(data => {
      console.log(data);
      [this.weekSchedule, this.startAndEndOfWeek] = data;
    });
    this.cols = [
      { field: 'lessonNumber', header: '№' },
      { field: 'subjectName', header: 'Предмет' },
      { field: 'homeWork', header: 'Домашня робота' },
      { field: 'mark', header: 'Оцінка' }
    ];
    this.scheduleOptions = [
      { label: 'День', value: 'day' },
      { label: 'Тиждень', value: 'week' }
    ];
  }

  changeWeekSchedule(week: boolean): void {
    const day = new Date();
    let currDay = day.getDate();
    if (week) {
      this.offset += 7;
      currDay += this.offset;
    } else {
      this.offset -= 7;
      currDay += this.offset;
    }
    const changedWeek = new Date(day.setDate(currDay));
    this.studentBookService.getDiariesList(changedWeek).subscribe(data => {
      if (typeof data === 'string') {
        this.notFound = data;
      }
      [this.weekSchedule, this.startAndEndOfWeek] = data;
    });
  }

  changeDaySchedule(type: string): void {
    if (type === 'list' && !this.view) {
      this.view = true;
      this.cols.push({ field: 'Note', header: 'Примітка' });
    } else if (type === 'group' && this.view) {
      this.view = false;
      this.cols.pop();
    }
  }
  changeDataView(): void {
    if (this.selectedType === 'day') {
      const currDate = new Date().getDay();
      const a = this.weekSchedule.filter(el => {
        return currDate === el.dayDate.getDay();
      });
      this.weekSchedule = a.length ? a : [this.weekSchedule[0]];
    } else {
      this.studentBookService.getDiariesList().subscribe(data => {
        if (typeof data === 'string') {
          this.notFound = data;
        }
        [this.weekSchedule, this.startAndEndOfWeek] = data;
      });
    }
  }
}
