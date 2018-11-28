import { Component, OnInit } from '@angular/core';
import { ClassScheduleService } from 'src/app/services/class-schedule.service';
import { Schedule } from 'src/app/models/class-schedule';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-class-schedule',
  templateUrl: './class-schedule.component.html',
  styleUrls: ['./class-schedule.component.scss']
})
export class ClassScheduleComponent implements OnInit {
  ua: any;

  startOfSemester: Date;
  endOfSemester: Date;

  classes: Schedule[];
  selectedClass: string;

  weekDays = {
    mondaySubjects: [],
    tuesdaySubjects: [],
    wednesdaySubjects: [],
    thursdaySubjects: [],
    fridaySubjects: [],
    saturdaySubjects: []
  };

  constructor(private schedule: ClassScheduleService,
    private _teacherServices: TeachersService) {}

  ngOnInit() {
    this.getClasses();
    this.calendar();
  }

  getClasses(): void {
    this.schedule.getClasses().subscribe(data => {
      this.classes = data;
    });
  }

  // TODO: move to global scope for reusing
  calendar(): void {
    this._teacherServices.currentCalendar.subscribe(data => this.ua = data);
  }
}
