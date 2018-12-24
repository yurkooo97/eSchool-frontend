import { Component, OnInit, ViewChild } from '@angular/core';
import { ClassScheduleService } from 'src/app/services/class-schedule.service';
import { Schedule } from 'src/app/models/class-schedule';
import { Group } from 'src/app/models/group.model';
import { Subject } from 'src/app/models/subjects.model';
import { TeachersService } from 'src/app/services/teachers.service';
import { NgForm } from '@angular/forms';
import { DataSharingService } from 'src/app/services/data-sharing.service';

@Component({
  selector: 'app-class-schedule',
  templateUrl: './class-schedule.component.html',
  styleUrls: ['./class-schedule.component.scss']
})
export class ClassScheduleComponent implements OnInit {
  @ViewChild('form') form: NgForm;

  subjects: Subject[];
  subjectNames: any;

  classes: Group[];
  selectedClass: any;
  selectedSubject: any;

  reset: any;
  ua: any;

  fromDate: Date;
  toDate: Date;
  minDateValue: Date;
  maxDateValue: Date;

  schedule: Schedule;

  constructor(
    private _teacherServices: TeachersService,
    private notificationToasts: DataSharingService,
    private scheduleService: ClassScheduleService
  ) { }

  ngOnInit() {
    this.getClasses();
    this.calendar();
    this.minDateValue = new Date(new Date().getTime() + 24 * 60 * 60 * 1000); // minDate is tomorrow
    this.maxDateValue = new Date(
      new Date().getTime() + 7 * 31 * 24 * 60 * 60 * 1000 // maxDate is a day in a year ahead
    );
    this.schedule = new Schedule();
  }

  // event to select group
  onClassSelected(selectedClassEvent): void {
    this.schedule.className = this.classes.find(
      item => item.id === selectedClassEvent.value
    );
  }

  calendar(): void {
    this._teacherServices.currentCalendar.subscribe(data => (this.ua = data));
  }

  formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return [year, month, day].join('-');
  }

  // request to add a list of classes
  getClasses(): void {
    this.scheduleService.getClasses().subscribe(data => {
      this.classes = data;
    });
  }

  // request to save schedule
  submitForm(form: NgForm): void {
    Object.keys(this.schedule).forEach((item: any) => {
      if (this.schedule[item].pop) {
        this.schedule[item].pop();
      }
    });
    this.schedule.startOfSemester = this.formatDate(
      this.schedule.startOfSemester
    );
    this.schedule.endOfSemester = this.formatDate(this.schedule.endOfSemester);

    this.scheduleService.postSchedule(this.schedule).subscribe(
      data => {
        this.notificationToasts.notify(
          'success',
          'Успішно виконано',
          'Розклад збережено'
        );
        this.form.reset();
        this.schedule = new Schedule();
      },
      error => {
        this.notificationToasts.notify(
          'error',
          'Відхилено',
          'Не вдалося зберегти розклад уроків'
        );
        Object.keys(this.schedule).forEach((item: any) => {
          if (this.schedule[item].push) {
            this.schedule[item].push({});
          }
        });
      }
    );
  }
}
