import { Component, OnInit } from '@angular/core';
import { ClassScheduleService } from 'src/app/services/class-schedule.service';
import { Schedule } from 'src/app/models/class-schedule';
<<<<<<< HEAD
import { Group } from 'src/app/models/group.model';
import { Subject } from 'src/app/models/subjects.model';
=======
import { TeachersService } from 'src/app/services/teachers.service';
>>>>>>> bdde551ed3674866ea3b1427a6ece3ebb0434d1f

@Component({
  selector: 'app-class-schedule',
  templateUrl: './class-schedule.component.html',
  styleUrls: ['./class-schedule.component.scss']
})
export class ClassScheduleComponent implements OnInit {
  subjects: Subject[];
  subject: string;

  ua: any;

  startOfSemester: Schedule[];
  startOfSem: string;
  fromDate: Date;
  endOfSemester: Schedule[];
  endOfSem: string;
  toDate: Date;
  defaultDate: Date;
  minDateValue: Date;
  maxDateValue: Date;

  classes: Group[];
  class: string;

  Schedule: Schedule[];
  classSchedule = {
    mondaySubjects: [1],
    tuesdaySubjects: [1],
    wednesdaySubjects: [1],
    thursdaySubjects: [1],
    fridaySubjects: [1],
    saturdaySubjects: [1]
  };

<<<<<<< HEAD
  constructor(private schedule: ClassScheduleService) {
    this.defaultDate = new Date();
    this.minDateValue = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    this.maxDateValue = new Date(
      new Date().getTime() + 12 * 31 * 24 * 60 * 60 * 1000
    );
  }
=======
  constructor(private schedule: ClassScheduleService,
    private _teacherServices: TeachersService) {}
>>>>>>> bdde551ed3674866ea3b1427a6ece3ebb0434d1f

  ngOnInit() {
    this.getClasses();
    this.calendar();
    this.getScheduleSubjects();
  }

  getScheduleSubjects(): void {
    this.schedule.getScheduleSubjects().subscribe(data => {
      this.subjects = [new Subject('', '-'), ...data];
    });
  }

  getClasses(): void {
    this.schedule.getClasses().subscribe(data => {
      this.classes = data;
    });
  }

  getSchedule(classId): void {
    this.schedule.getSchedule(classId.value).subscribe(data => {
      this.Schedule = data;
    });
  }

  /*saveSchedule(): void {
    console.log('hello');
    this.schedule.postSchedule().subscribe(data => {
      this.Schedule = data;
    });
  }*/

  addFromDate(value) {
    this.startOfSem = JSON.stringify(value);
    console.log(this.startOfSem);
    console.log(typeof this.startOfSem);
  }

  addToDate(value) {
    this.endOfSem = JSON.stringify(value);
    console.log(this.endOfSem);
    console.log(typeof this.endOfSem);
  }

  delSubject(subject, day, i) {
    day[i] = subject.value;
    day.splice(i, 1);
    console.log(day);
  }

  addSubject(subject, day, i) {
    day[i] = subject.value;
    day[i + 1] = {};
    console.log(day);
    console.log(i);
  }

  // TODO: move to global scope for reusing
  calendar(): void {
<<<<<<< HEAD
    this.ua = {
      firstDayOfWeek: 1,
      dayNames: [
        'Неділя',
        'Понеділок',
        'Вівторок',
        'Середа',
        'Четвер',
        "П'ятниця",
        'Субота'
      ],
      dayNamesShort: ['Нед', 'Пон', 'Вів', 'Сер', 'Чет', "П'ят", 'Суб'],
      dayNamesMin: ['нд', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
      monthNames: [
        'Січень',
        'Лютий',
        'Березень',
        'Квітень',
        'Травень',
        'Червень',
        'Липень',
        'Серпень',
        'Вересень',
        'Жовтень',
        'Листопад',
        'Грудень'
      ],
      monthNamesShort: [
        'Січ',
        'Лют',
        'Бер',
        'Кві',
        'Тра',
        'Чер',
        'Лип',
        'Сер',
        'Вер',
        'Жов',
        'Лис',
        'Гру'
      ],
      today: 'Сьогодні',
      clear: 'Clear'
    };
=======
    this._teacherServices.currentCalendar.subscribe(data => this.ua = data);
>>>>>>> bdde551ed3674866ea3b1427a6ece3ebb0434d1f
  }
}
