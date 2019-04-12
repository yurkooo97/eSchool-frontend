import { Component, OnInit } from '@angular/core';
import { ClassScheduleService } from 'src/app/services/class-schedule.service';
import { Group } from 'src/app/models/group.model';
import { Schedule } from 'src/app/models/class-schedule';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-correct-schedule',
  templateUrl: './correct-schedule.component.html',
  styleUrls: ['./correct-schedule.component.scss']
})
export class CorrectScheduleComponent implements OnInit {
  classes: Group[];

  selectedGroupId: number;
  selectedGroup: string;

  schedule: Schedule;

  startOfSemester: Date;
  endOfSemester: Date;
  minDateValue: Date;
  maxDateValue: Date;

  ua: any;

  condition = false;

  constructor(
    private _teacherServices: TeachersService,
    private scheduleService: ClassScheduleService
  ) {}

  ngOnInit() {
    this.getClasses();
  }

  // request to add a list of classes
  getClasses(): void {
    this.scheduleService.getClasses().subscribe(data => {
      this.classes = data.filter(g => g.isActive);
    });
  }

  // event to select group and group id
  onClassSelected(selectedClassEvent): void {
    const group = this.classes.find(
      item => item.id === selectedClassEvent.value
    );
    this.selectedGroupId = group.id;
    this.selectedGroup = group.className;
    this.condition = false;
  }

  calendar(): void {
    this._teacherServices.currentCalendar.subscribe(data => (this.ua = data));
  }

  getSchedule(): void {
    this.scheduleService.getSchedule(this.selectedGroupId).subscribe(data => {
      this.schedule = data;
      console.log(this.schedule);
    });
    this.calendar();
    this.startOfSemester = new Date(this.schedule.startOfSemester);
    this.endOfSemester = new Date(this.schedule.endOfSemester);
    this.condition = true;
  }
}
