import { Component, OnInit } from '@angular/core';
import { ClassScheduleService } from 'src/app/services/class-schedule.service';
import { Schedule } from 'src/app/models/class-schedule';
import { Group } from 'src/app/models/group.model';
import { Subject } from 'src/app/models/subjects.model';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-class-schedule',
  templateUrl: './class-schedule.component.html',
  styleUrls: ['./class-schedule.component.scss']
})
export class ClassScheduleComponent implements OnInit {
  subjects: Subject[];

  ua: any;

  startSemester: Schedule[];
  startOfSemester: string;
  fromDate: Date;
  endSemester: Schedule[];
  endOfSemester: string;
  toDate: Date;
  defaultDate: Date;
  minDateValue: Date;
  maxDateValue: Date;

  classes: Group[];

  Schedule: Schedule[];
  classSchedule = {
    mondaySubjects: [1],
    tuesdaySubjects: [1],
    wednesdaySubjects: [1],
    thursdaySubjects: [1],
    fridaySubjects: [1],
    saturdaySubjects: [1]
  };

  constructor(
    private _teacherServices: TeachersService,
    private schedule: ClassScheduleService
  ) {}

  ngOnInit() {
    this.getClasses();
    this.calendar();
    this.getScheduleSubjects();
    this.defaultDate = new Date();
    this.minDateValue = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    this.maxDateValue = new Date(
      new Date().getTime() + 12 * 31 * 24 * 60 * 60 * 1000
    );
  }

  delSubject(subject, day, i) {
    day[i] = subject.value;
    day.splice(i, 1);
  }

  addSubject(subject, day, i) {
    day[i] = subject.value;
    day[i + 1] = {};
  }

  calendar(): void {
    this._teacherServices.currentCalendar.subscribe(data => (this.ua = data));
  }

  getScheduleSubjects(): void {
    this.schedule.getScheduleSubjects().subscribe(data => {
      this.subjects = data;
      // this.subjects = [new Subject('', '-'), ...data];
    });
  }

  getClasses(): void {
    this.schedule.getClasses().subscribe(data => {
      this.classes = data;
      console.log(this.classes);
    });
  }

  /*getSchedule(selectedClass) {
    console.log('hello');
    this.classes = selectedClass;
    console.log(this.classes);
  }*/

  getSchedule(classId): void {
    console.log('hello');
    this.schedule.getSchedule(classId).subscribe(data => {
      this.classes = data;
    });
  }

  /*submitForm(): void {
    console.log(this.selectedClass);
    this.startOfSemester = this._teacherServices.formatDate(
      this.startOfSemester
    );
    this.endOfSemester = this._teacherServices.formatDate(this.endOfSemester);
    this.schedule.postSchedule(className.Id).subscribe(data => {
      this.Schedule = data;
    });
  }*/
}
