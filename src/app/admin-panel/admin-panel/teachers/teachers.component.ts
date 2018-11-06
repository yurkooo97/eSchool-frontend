import { Component, OnInit } from "@angular/core";
import { TeachersService } from "../../../services/teachers.service";
import { Iteachers } from "src/app/services/teachers";

@Component({
  selector: "app-teachers",
  templateUrl: "./teachers.component.html",
  styleUrls: ["./teachers.component.scss"]
})
export class TeachersComponent implements OnInit {
  displayDialog: boolean;
  teachers: any[];
  teacher: any;
  columns: any[];
  newTeacher: boolean;
  selectedTeacher: Iteachers;

  constructor(private _teacherServices: TeachersService) {}

  ngOnInit() {
    this._teacherServices
      .getTeachers()
      .subscribe(users => (this.teachers = users));
    this.columns = [
      { field: "firstname", header: "Ім'я" },
      { field: "lastname", header: "Прізвище" },
      { field: "patronymic", header: "По батькові" },
      { field: "dateOfBirth", header: "Дата народження" }
    ];
  }
  showDialogToAdd() {
    this.displayDialog = true;
    this.newTeacher = true;
    this.teacher = {};
  }
  onRowSelect(event) {
    this.newTeacher = false;
    this.teacher = {
      ...event.data
    };
    this.displayDialog = true;
  }
}
