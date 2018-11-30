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
  weekSchedule: any;

  startAndEndOfWeek: string;

  offset = 0;

  menuItems: MenuItem[];

  cols;

  notFound: string;

  scheduleOptions: SelectItem[];

  view = false;

  faListUl = faListUl;

  faThLarge = faThLarge;

  selectedType = 'week';

  private clonedWeekSchedule: any;

  viewOptions: SelectItem[];

  viewType = 'group';

  constructor(private studentBookService: StudentBookService) { }

  ngOnInit() {
    this.studentBookService.getDiariesList().subscribe(data => {
      [this.weekSchedule] = data;
      this.startAndEndOfWeek = `${this.weekSchedule[0].dayUkrDate} - ${this.weekSchedule[this.weekSchedule.length - 1].dayUkrDate}`;
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

    this.viewOptions = [
      { value: 'list', icon: 'pi pi-list' },
      { value: 'group', icon: 'pi pi-th-large' }
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
      } else {
        this.notFound = '';
        [this.weekSchedule] = data;
        this.startAndEndOfWeek = `${this.weekSchedule[0].dayUkrDate} - ${this.weekSchedule[this.weekSchedule.length - 1].dayUkrDate}`;
        this.clonedWeekSchedule = [...this.weekSchedule];
      }
    });
  }

  changeScheduleView(): void {
    if (this.viewType === 'list' && !this.view) {
      this.view = true;
      this.cols.push({ field: 'Note', header: 'Примітка' });
    } else if (this.viewType === 'group' && this.view) {
      this.view = false;
      this.cols.pop();
    }
  }

  changeDataView(): void {
    if (this.selectedType === 'day') {
      this.viewType = 'list';
      this.changeScheduleView();
      const currDate = new Date().setHours(0, 0, 0, 0);
      const today = this.weekSchedule.filter(el => {
        return currDate === el.dayDate.getTime();
      });
      this.clonedWeekSchedule = [...this.weekSchedule];
      this.weekSchedule = today.length ? today : [this.weekSchedule[0]];
      this.startAndEndOfWeek = `${this.weekSchedule[0].dayUkrDate}`;
    } else {
      this.weekSchedule = this.clonedWeekSchedule || this.weekSchedule;
      this.startAndEndOfWeek = `${this.weekSchedule[0].dayUkrDate} - ${this.weekSchedule[this.weekSchedule.length - 1].dayUkrDate}`;
      this.viewType = 'group';
      this.changeScheduleView();
    }
  }

  switchSchedule(direction: boolean): void {
    if (this.selectedType === 'day') {
      this.changeDaySchedule(direction);
    } else {
      this.changeWeekSchedule(direction);
    }
  }

  changeDaySchedule(type: boolean): void {
    const index = this.clonedWeekSchedule.indexOf(this.weekSchedule[0]);
    if (type && index !== this.clonedWeekSchedule.length - 1) {
      this.weekSchedule = [this.clonedWeekSchedule[index + 1]];
      this.startAndEndOfWeek = `${this.weekSchedule[0].dayUkrDate}`;
    } else if (!type && index !== 0) {
      this.weekSchedule = [this.clonedWeekSchedule[index - 1]];
      this.startAndEndOfWeek = `${this.weekSchedule[0].dayUkrDate}`;
    }
  }

}
