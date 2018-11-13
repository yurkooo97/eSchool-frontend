import { Component, OnInit } from '@angular/core';
import { TeachersService } from '../../../services/teachers.service';
import { Iteachers } from 'src/app/models/teachers';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent implements OnInit {
  displayDialog: boolean;
  teachers: any[];
  teacher: any;
  columns: any[];
  newTeacher: boolean;
  selectedTeacher: Iteachers;
  imageUrl: any = 'assets/avatar.png';
  fileToUpload: File = null;
  constructor(private _teacherServices: TeachersService) {}

  ngOnInit() {
    this._teacherServices
      .getTeachers()
      .subscribe(users => (this.teachers = users));
    this.columns = [
      { field: 'firstname', header: 'Ім\'я' },
      { field: 'lastname', header: 'Прізвище' },
      { field: 'patronymic', header: 'По батькові' },
      { field: 'dateOfBirth', header: 'Дата народження' }
    ];
  }
  handlerFileInput(file: FileList){
    this.fileToUpload = file.item(0);
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
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
  create() {
    if (this.teacher.firstname.length >= 3 && this.teacher.lastname.length >= 3 && this.teacher.patronymic.length >= 7 ){
      this.displayDialog = false;
    }
    this._teacherServices
      .postTeacher(this.teacher)
      .subscribe(
        teacher => this.teachers.push(teacher),
        err => console.error(err)
      );
  }
  save() {
    this.displayDialog = false;
    this._teacherServices.putTeacher(this.teacher).subscribe(
      teacher => {
        let teachers = [...this.teachers];
        teachers[this.teachers.indexOf(this.selectedTeacher)] = teacher;
        this.teachers = teachers;
      },
      err => console.error(err)
    );
    this.teacher = null;
  }
}
