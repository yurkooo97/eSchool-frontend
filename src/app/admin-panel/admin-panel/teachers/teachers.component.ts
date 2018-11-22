import { Component, OnInit } from '@angular/core';
import { TeachersService } from '../../../services/teachers.service';
import { Iteachers } from 'src/app/models/teachers';
import { DataSharingService } from 'src/app/services/data-sharing.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})

export class TeachersComponent implements OnInit {
  photoData: string;
  loading: boolean;
  displayDialog: boolean;
  teachers: Iteachers[];
  teacher: any;
  columns: Array<object>;
  newTeacher: boolean;
  selectedTeacher: Iteachers;
  imageUrl: any = 'assets/avatar.png';
  fileToUpload: File = null;
  constructor(
    private _teacherServices: TeachersService,
    private notificationToasts: DataSharingService
  ) {}

  ngOnInit() {
    this.loading = true;
    this._teacherServices
      .getTeachers()
      .subscribe(users => ((this.teachers = users), (this.loading = false)));
    this.columns = [
      { field: 'lastname', header: 'Прізвище' },
      { field: 'firstname', header: 'Ім\'я' },
      { field: 'patronymic', header: 'По батькові' },
      { field: 'dateOfBirth', header: 'Дата народження' }
    ];
  }
  handlerFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.teacher.avatar = event.target.result;
      if (file.item(0).size > 500000) {
        this.photoData = 'Перевищено максимальний розмір фото 500 кб';
        this.imageUrl = 'assets/avatar.png';
      } else {
        this.photoData = '';
        this.imageUrl = event.target.result;
      }
    };
    reader.readAsDataURL(this.fileToUpload);
  }
  showDialogToAdd() {
    this.displayDialog = true;
    this.newTeacher = true;
    this.teacher = {};
  }
  onRowSelect(rowData) {
    this.newTeacher = false;
    this.teacher = {
      ...rowData
    };
    this.displayDialog = true;
  }
  create() {
    this.displayDialog = false;
    this._teacherServices.postTeacher(this.teacher).subscribe(
      teacher => {
        this.teachers.push(teacher);
        this.notificationToasts.notify(
          'success',
          'Успішно виконано',
          'Додано нового вчителя'
        );
      },
      err => {
        console.error(err);
        this.notificationToasts.notify(
          'error',
          'Відхилено',
          'Невдалося додати нового вчителя'
        );
      }
    );
  }
  save() {
    this.displayDialog = false;
    this._teacherServices.putTeacher(this.teacher).subscribe(
      teacher => {
        const teachers = [...this.teachers];
        teachers[this.teachers.indexOf(this.selectedTeacher)] = teacher;
        this.teachers = teachers;
        this.notificationToasts.notify(
          'success',
          'Успішно виконано',
          'Збережено зміни вчителя'
        );
      },
      err => {
        console.error(err);
        this.notificationToasts.notify(
          'error',
          'Відхилено',
          'Невдалося зберегти зміни вчителя'
        );
      }
    );
    this.teacher = null;
  }
}
