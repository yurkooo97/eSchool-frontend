import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpAttachTeacherService } from 'src/app/services/http-attach-teacher.service';
import { Teacher } from 'src/app/models/teacher.model';
import { Subject } from 'src/app/models/subjects.model';
import { Group } from 'src/app/models/group.model';
import { AttachedTeacher } from 'src/app/models/attached-teacher.model';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-attach-teacher',
  templateUrl: './attach-teacher.component.html',
  styleUrls: ['./attach-teacher.component.scss'],
  providers: [HttpAttachTeacherService]
})
export class AttachTeacherComponent implements OnInit {
  @ViewChild('AttachTeacherForm') form: NgForm;
  title = 'Привз\'яка вчителя до журналу';

  teacher: Teacher;
  teachers: Teacher[] = [];
  filteredTeachers: Teacher[];

  subject: Subject;
  subjects: Subject[] = [];
  filteredSubjects: Subject[];

  _class: Group;
  classes: Group[] = [];
  filteredClasses: Group[];

  object: AttachedTeacher = {
    classId: 0,
    subjectId: 0,
    teacherId: 0
  };
  constructor(private attachService: HttpAttachTeacherService) { }

  filterTeachers(event) {
    this.filteredTeachers = [];
    for (let i = 0; i < this.teachers.length; i++) {
      const teacher = this.teachers[i];
      if (teacher.fullname.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
        this.filteredTeachers.push(teacher);
      }
    }
  }
  filterSubjects(event) {
    this.filteredSubjects = [];
    for (let i = 0; i < this.subjects.length; i++) {
      const subject = this.subjects[i];
      if (subject.subjectName.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
        this.filteredSubjects.push(subject);
      }
    }
  }
  filterClasses(event) {
    this.filteredClasses = [];
    for (let i = 0; i < this.classes.length; i++) {
      const __class = this.classes[i];
      if (__class.className.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
        this.filteredClasses.push(__class);
      }
    }
  }
  postAttachTeacher() {
    this.object.subjectId = this.form.value.subject.subjectId;
    this.object.teacherId = this.form.value.teacher.id;
    this.object.classId = this.form.value._class.id;
    console.log(this.object);
    this.attachService.postAttachTeacher(this.object)
      .subscribe(
        data => console.log(data),
        error => console.log(error)
      );
    this.form.reset();
  }

  ngOnInit() {
    this.attachService.getTeachers().subscribe(data => this.teachers = data);
    this.attachService.getSubjects().subscribe(data => this.subjects = data);
    this.attachService.getClasses().subscribe(data => this.classes = data);
  }
}
