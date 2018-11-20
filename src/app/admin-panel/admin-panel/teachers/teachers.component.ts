import { Component, OnInit } from '@angular/core';
import { TeachersService } from '../../../services/teachers.service';
import { Iteachers } from 'src/app/models/teachers';
import { MessageService } from 'primeng/api';

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
  columns: any[];
  newTeacher: boolean;
  selectedTeacher: Iteachers;
  imageUrl: any = 'assets/avatar.png';
  fileToUpload: File = null;
  constructor(private _teacherServices: TeachersService, private messageService: MessageService) { }

  ngOnInit() {
    this.loading = true;
    this._teacherServices
      .getTeachers()
      .subscribe(users => (this.teachers = users, this.loading = false));
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
    if (
      this.teacher.firstname.length >= 3 &&
      this.teacher.lastname.length >= 3 &&
      this.teacher.patronymic.length >= 7
    ) {
      this.displayDialog = false;
    }
    this._teacherServices
      .postTeacher(this.teacher)
      .subscribe(
        teacher => {
          this.teachers.push(teacher);
          this.messageService.add({ severity: 'success', summary: 'Вчителя створено', detail: 'Успішно добавлено вчителя' });
        },
        err => console.error(err)
      );
  }
  save() {
    this.displayDialog = false;
    this._teacherServices.putTeacher(this.teacher).subscribe(
      teacher => {
        const teachers = [...this.teachers];
        teachers[this.teachers.indexOf(this.selectedTeacher)] = teacher;
        this.teachers = teachers;
        this.messageService.add({ severity: 'success', summary: 'Вчителя редаговано', detail: 'Успішно відредаговано вчителя' });
      },
      err => {console.error(err);
        this.messageService.add({ severity: 'warn', summary: 'Вчителя створено', detail: 'Успішно добавлено вчителя' });
      }
    );
    this.teacher = null;
  }
}
