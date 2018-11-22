import { Component, OnInit} from '@angular/core';
import { ClassScheduleService } from 'src/app/services/class-schedule.service';
import { Schedule } from 'src/app/models/class-schedule';


@Component({
  selector: 'app-class-schedule',
  templateUrl: './class-schedule.component.html',
  styleUrls: ['./class-schedule.component.scss']
})


export class ClassScheduleComponent implements OnInit{

	ua: any;

	startOfSemester: Date;
	endOfSemester: Date;

  classes: Schedule[];
	selectedClass: string;

	weekDays = {
		mondaySubjects: [-1, -1, -1, -1, -1, -1],
		tuesdaySubjects: [-1, -1, -1, -1, -1, -1],
		wednesdaySubjects: [-1, -1, -1, -1, -1, -1],
		thursdaySubjects: [-1, -1, -1, -1, -1, -1],
		fridaySubjects: [-1, -1, -1, -1, -1, -1],
		saturdaySubjects: [-1, -1, -1, -1, -1, -1]
	};

	
	constructor(private schedule: ClassScheduleService) {}
    
	ngOnInit() {
		this.getClasses();
		this.calendar();
  }

  getClasses(): void {
    this.schedule.getClasses().subscribe(data => {this.classes = data});
	}
	

  calendar(): void {
    this.ua = {
			firstDayOfWeek: 1,
			dayNames: ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"],
			dayNamesShort: ["Нед", "Пон", "Вів", "Сер", "Чет", "П'ят", "Суб"],
			dayNamesMin: ["нд","пн","вт","ср","чт","пт","сб"],
			monthNames: [ "Січень","Лютий","Березень","Квітень","Травень","Червень","Липень","Серпень","Вересень","Жовтень","Листопад","Грудень" ],
			monthNamesShort: [ "Січ", "Лют", "Бер", "Кві", "Тра", "Чер","Лип", "Сер", "Вер", "Жов", "Лис", "Гру" ],
			today: 'Сьогодні',
			clear: 'Clear'
		};
	}
  
}

