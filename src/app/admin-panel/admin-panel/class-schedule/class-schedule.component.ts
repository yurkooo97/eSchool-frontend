import { Component, OnInit } from '@angular/core';
import { ClassScheduleService } from 'src/app/services/class-schedule.service';
import { Classes } from 'src/app/models/class-schedule';


@Component({
  selector: 'app-class-schedule',
  templateUrl: './class-schedule.component.html',
  styleUrls: ['./class-schedule.component.scss']
})


export class ClassScheduleComponent implements OnInit{

  ua: any;

	date1: Date;
	date2: Date;

  classes: Classes[];
	selectedClass: string;
	
  constructor(private activeClasses: ClassScheduleService) {}
    
	ngOnInit() {
    this.getClasses();
  }

  getClasses(): void {
    this.activeClasses.getClasses().subscribe(data => console.log(data));
  }

  calendar() {
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

