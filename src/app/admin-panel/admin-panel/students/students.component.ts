import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../../services/admin-students.service';
import { Student } from '../../../models/students.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Class} from '../../../models/classesForStudents';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
  providers: [StudentsService]
})
export class StudentsComponent implements OnInit {

  classes: Class[];
  students: Student[];
  avatars: any[] = [];
  newStudent: Student;
  isNew: boolean;
  cols: any[];
  selectedClass: number = 0;
  displayForm: boolean;
  constructor(private service_: StudentsService, private formBuilder: FormBuilder) {
    this.students = new Array<Student>();
  }

  addStudentForm: FormGroup;

  ngOnInit() {
    this.service_.getClasses().subscribe(
      data => {
        this.classes = data as any;
      });

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

    this.addStudentForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      patronymic: ['', Validators.required],
      classId: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      email: [''],
      phone: [''],
      login: ['', Validators.required],
      avatar: [''],
      selectClass: ['']
    });

    this.newStudent = new Student('', '', '', 0, '', '', '', '', 0);
  }

  loadStudents(classID: number) {
    this.service_.getStudents(classID).subscribe(
      data => {
        this.students = data;
      });
  }

  createStudent() {
    this.newStudent = new Student('', '', '', 0, '', '', '', '', 0);
    this.students.push(this.newStudent);
    this.isNew = true;
    this.showForm();
  }

  editStudent(student: Student) {
    this.newStudent = new Student(student.firstname, student.lastname, student.patronymic, student.classId, student.dateOfBirth, student.email, student.phone, student.login, student.id);
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

  showForm() {
    this.displayForm = true;
  }
  hideForm() {
    this.displayForm = false;
    if (this.isNew) {
      this.loadStudents(21);
    }
  }

  uploadAvatar(e) {
    for (let avatar of e.files) {
      this.avatars.push(avatar);
    }
  }

}
