import { Component, OnInit } from '@angular/core';
import { HttpAttachTeacherService } from 'src/app/services/http-attach-teacher.service';
import { Teacher } from 'src/app/models/teacher.model';
import { Subject } from 'src/app/models/subjects.model';
import { Group } from 'src/app/models/group.model';
import { AttachedTeacher } from 'src/app/models/attached-teacher.model';

@Component({
  selector: 'app-attach-teacher',
  templateUrl: './attach-teacher.component.html',
  styleUrls: ['./attach-teacher.component.scss'],
  providers: [HttpAttachTeacherService]
})
export class AttachTeacherComponent implements OnInit {
  title = 'Привз\'яка вчителя до журналу';

  set teacher(teacher: Teacher) {
    this.object.teacherId = teacher.id;
    console.log(teacher.id);
  }
  teachers: Teacher[] = [];
  filteredTeachers: Teacher[];

  set subject(subject: Subject) {
    this.object.subjectId = subject.subjectId;
    console.log(subject.subjectId);
  }
  subjects: Subject[] = [];
  filteredSubjects: Subject[];

  set _class(_class: Group) {
    this.object.classId = _class.id;
    console.log(_class.id);
  }
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
      if (teacher.firstname.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
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
  postAttachTeacher(obj: AttachedTeacher) {
    console.log(obj);
    this.attachService.postAttachTeacher(obj).subscribe(data => console.log(data));
  }

  ngOnInit() {
    this.attachService.getTeachers().subscribe(data => this.teachers = data);
    this.attachService.getSubjects().subscribe(data => this.subjects = data);
    this.attachService.getClasses().subscribe(data => this.classes = data);
  }
}
