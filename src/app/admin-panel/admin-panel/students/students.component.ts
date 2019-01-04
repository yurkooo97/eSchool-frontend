import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../../services/admin-students.service';
import { Student } from '../../../models/students.model';
import { Classes } from '../../../models/classesForStudents.model';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { TeachersService } from 'src/app/services/teachers.service';
import { OverlayPanel } from 'primeng/primeng';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
  providers: [StudentsService, MessageService]
})
export class StudentsComponent implements OnInit {
  ua: object;
  classes: Classes[];
  students: Student[];
  newStudent: Student;
  selectedStudent: Student;
  numberOfStudents: number;
  isNew: boolean;
  loading: boolean;
  screenWidth: number;
  cols: any[];
  selectedClassName: string;
  selectedClassId: number;
  displayForm: boolean;
  photoMessage: string;
  imageUrl: any = 'assets/avatar.png';
  fileToUpload: File = null;
  constructor(
    private service_: StudentsService,
    private notificationToasts: DataSharingService,
    private _teacherServices: TeachersService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.screenWidthDetector();
    this.loading = true;
    this.service_.getClasses()
      .subscribe(data => {
          this.classes = data;
          this.loading = false;
        });

    this.cols = [
      { field: 'firstname', header: 'Ім\'я' },
      { field: 'lastname', header: 'Прізвище' },
      { field: 'patronymic', header: 'По батькові' }
    ];

    this.newStudent = new Student();
    this.selectedStudent = new Student();
    this._teacherServices.currentCalendar.subscribe(data => this.ua = data);
  }

  handlerFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
    const reader = new FileReader();
    reader.onload = (event: any) => {
      if (file.item(0).size > 500000) {
        this.photoMessage = 'Перевищено максимальний розмір 500 кб';
        this.imageUrl = 'assets/avatar.png';
      } else {
        this.photoMessage = '';
        this.newStudent.avatar = event.target.result;
      }
    };
    reader.readAsDataURL(this.fileToUpload);
  }

  loadStudents(classID: number) {
    this.loading = true;
    this.selectedClassId = classID;
    this.service_.getStudents(classID)
      .subscribe(
        data => {
          this.students = data;
          this.loading = false;
          this.numberOfStudents = data.length;
        });
  }

  createStudent() {
    this.newStudent = new Student(
      '',
      '',
      '',
      this.selectedClassId,
      '',
      '',
      '',
      '',
      0,
      '',
      '',
      this.newStudent.avatar
    );
    this.isNew = true;
    this.showForm();
  }

  editStudent(student: Student) {
    this.newStudent = new Student(
      student.firstname,
      student.lastname,
      student.patronymic,
      student.classId = null,
      student.dateOfBirth,
      student.email,
      student.phone,
      student.login,
      student.id,
      student.oldPass,
      student.newPass,
      student.avatar
    );
    this.isNew = false;
  }

  saveStudent() {
    if (this.isNew) {
      this.newStudent.dateOfBirth = this._teacherServices.formatDate(this.newStudent.dateOfBirth);
      this.displayForm = false;
      this.service_.addStudent(this.newStudent).subscribe(data => {
        this.loadStudents(this.selectedClassId);
        this.displayForm = false;
        this.notificationToasts.notify(
          'success',
          'Успішно виконано',
          'Додано нового учня'
        );
      }, error => {
        this.notificationToasts.notify(
          'error',
          'Відхилено',
          'Невдалося додати нового учня');
      });
    } else {
      this.newStudent.dateOfBirth = this._teacherServices.formatDate(this.newStudent.dateOfBirth);
      this.displayForm = false;
      this.service_.changeStudent(this.newStudent).subscribe(data => {
        this.loadStudents(this.selectedClassId);
        this.displayForm = false;
        this.notificationToasts.notify(
          'success',
          'Успішно виконано',
          'Збережено зміни учня'
        );
      }, error => {
        this.notificationToasts.notify(
          'error',
          'Відхилено',
          'Невдалося зберегти учня');
      });
    }
  }

  selectedClassNameHandler(nameOfClass: string) {
    this.selectedClassName = nameOfClass;
  }

  showForm() {
    this.displayForm = true;
  }

  studentInfo(event, student: Student, overlaypanel: OverlayPanel) {
    this.selectedStudent = student;
    overlaypanel.toggle(event);
  }

  showConfirm(student: Student) {
    this.selectedStudent = student;
    this.messageService.clear();
    this.messageService.add({
      key: 'c',
      sticky: true,
      severity: 'warn',
      summary: 'Ви впевнені, що хочите видалити такого учня:',
      detail: 'Підтвердіть, або скасуйте видалення'
    });
  }

  onConfirm() {
    this.service_.deleteStudent(this.newStudent).subscribe(data => {
      this.loadStudents(this.selectedClassId);
      this.notificationToasts.notify(
        'success',
        'Успішно виконано',
        'Учня видалено'
      );
    }, error => {
      this.notificationToasts.notify(
        'error',
        'Відхилено',
        'Невдалося видалити учня');
    });
    this.messageService.clear('c');
  }

  onReject() {
    this.messageService.clear('c');
  }

  screenWidthDetector() {
    this.screenWidth = window.innerWidth;
  }
}
