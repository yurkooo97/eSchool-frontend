import { Component, OnInit, Input } from '@angular/core';
import { Schedule } from 'src/app/models/class-schedule';
import { ClassScheduleService } from 'src/app/services/class-schedule.service';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnInit {
  @Input() subjectsList;

  subjects: Schedule[];
  subject: string;

  constructor(private activeSubjects: ClassScheduleService) {}

  ngOnInit() {
    this.activeSubjects.getScheduleSubjects().subscribe(data => {
      this.subjects = data;
    });
  }

  addSubject(subject, day) {
    this.subjectsList[day] = subject.value;
    console.log(this.subjectsList);
  }
}
