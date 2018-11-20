import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../../services/admin-students.service';
import { Student } from '../../../models/students.model';
import {Class_} from '../../../models/classesForStudents.model';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
  providers: [StudentsService]
})
export class StudentsComponent implements OnInit {

  classes: Class_[];
  students: Student[];
  newStudent: Student;
  isNew: boolean;
  loading: boolean;
  cols: any[];
  selectedClass: number = 0;
  selectedClassName: string = '8-А класу';
  displayForm: boolean;
  imageUrl: any = 'assets/avatar.png';
  fileToUpload: File = null;
  constructor(private service_: StudentsService) {}

  ngOnInit() {
    this.loading = true;
    this.service_.getClasses().subscribe(
      data => (
        this.classes = data['data'],
          this.loading = false
  ));

    this.loadStudents(1);

    this.cols = [
      { field: 'firstname', header: 'Ім\'я' },
      { field: 'lastname', header: 'Прізвище' },
      { field: 'patronymic', header: 'По-батькові' },
      { field: 'classe', header: 'Клас' },
      { field: 'dateOfBirth', header: 'Дата народження' },
      { field: 'email', header: 'Email' },
      { field: 'phone', header: 'Номер телефону' },
      { field: 'login', header: 'Логін' },
    ];

    this.newStudent = new Student();
  }

  loadStudents(classID: number) {
    this.loading = true;
    this.service_.getStudents(classID).subscribe(
      data => (
        this.students = data['data'],
          this.loading = false
  ));
  }

  createStudent() {
    this.newStudent = new Student();
    this.isNew = true;
    this.showForm();
  }

  editStudent(student: Student) {
    this.newStudent = new Student(student.firstname, student.lastname, student.patronymic, student.classId, student.dateOfBirth, student.email, student.phone, student.login, student.id, student.avatar);
    this.isNew = false;
    this.showForm();
  }

  saveStudent() {
    if (this.isNew) {
      this.service_.addStudent(this.newStudent).subscribe(data => {
        console.log('Added!!!'),
        this.loadStudents(21),
        this.displayForm = false;
      });
    } else {
      this.service_.changeStudent(this.newStudent).subscribe( data => {
        console.log('Updated!!!'),
        this.loadStudents(21),
        this.displayForm = false;
      });
    }
  }

  selectedClassHandler(event: any) {
    this.selectedClass = event.target.value;
    this.newStudent.classId = this.selectedClass;
  }

  selectedClassNameHendler(nameOfClass: string) {
    this.selectedClassName = nameOfClass;
  }

  showForm() {
    this.displayForm = true;
  }
  hideForm() {
    this.displayForm = false;
    if (this.isNew) {
      this.loadStudents(21);
    }
  }
  handlerFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
  }
}
