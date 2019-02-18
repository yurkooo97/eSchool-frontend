import { Component, OnInit } from '@angular/core';
import { ClassScheduleService } from 'src/app/services/class-schedule.service';
import { Group } from 'src/app/models/group.model';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-correct-schedule',
  templateUrl: './correct-schedule.component.html',
  styleUrls: ['./correct-schedule.component.scss']
})
export class CorrectScheduleComponent implements OnInit {
  classes: Group[];

  constructor(private scheduleService: ClassScheduleService) {}

  ngOnInit() {
    this.getClasses();
  }

  // request to add a list of classes
  getClasses(): void {
    this.scheduleService.getClasses().subscribe(data => {
      this.classes = data.filter(g => g.isActive);
    });
  }
}
