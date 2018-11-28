import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpAttachTeacherService } from 'src/app/services/http-attach-teacher.service';
import { Teacher } from 'src/app/models/teacher.model';
import { Subject } from 'src/app/models/subjects.model';
import { Group } from 'src/app/models/group.model';
import { NgForm } from '@angular/forms';
import { DataSharingService } from 'src/app/services/data-sharing.service';


@Component({
  selector: 'app-attach-teacher',
  templateUrl: './attach-teacher.component.html',
  styleUrls: ['./attach-teacher.component.scss'],
  providers: [HttpAttachTeacherService]
})
export class AttachTeacherComponent implements OnInit {
  @ViewChild('AttachTeacherForm') form: NgForm;
  public title = 'Прив\'язка вчителя до журналу';

  public teacher: Teacher;
  private teachers: Teacher[] = [];
  private filteredTeachers: Teacher[];

  public subject: Subject;
  private subjects: Subject[] = [];
  private filteredSubjects: Subject[];

  public _class: Group;
  private classes: Group[] = [];
  private filteredClasses: Group[];

  constructor(
    private attachService: HttpAttachTeacherService,
    private notificationToasts: DataSharingService) { }

  /**Add teacher to suggestion list */
  filterTeachers(event): void {
    this.filteredTeachers = [];
    for (let i = 0; i < this.teachers.length; i++) {
      const teacher = this.teachers[i];
      if (teacher.fullname.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
        this.filteredTeachers.push(teacher);
      }
    }
  }

  /**Add subject to suggestion list */
  filterSubjects(event): void {
    this.filteredSubjects = [];
    for (let i = 0; i < this.subjects.length; i++) {
      const subject = this.subjects[i];
      if (subject.subjectName.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
        this.filteredSubjects.push(subject);
      }
    }
  }

  /**Add class to suggestion list */
  filterClasses(event): void {
    this.filteredClasses = [];
    for (let i = 0; i < this.classes.length; i++) {
      const __class = this.classes[i];
      if (__class.className.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
        this.filteredClasses.push(__class);
      }
    }
  }

  postAttachTeacher() {
    this.attachService.postAttachTeacher(
      {
        subjectId: this.form.value.subject.subjectId,
        teacherId: this.form.value.teacher.id,
        classId: this.form.value._class.id
      }
    ).subscribe(
      data => {
        console.log(data);
        this.notificationToasts.notify('success', 'Успішно виконано', 'Прив\'язку вчителя до журналу');
      },
      error => {
        console.log(error);
        this.notificationToasts.notify('error', 'Відхилено', 'Невдалося виконати прив\'язку вчителя до журналу');
      });
    this.form.reset();
  }

  ngOnInit() {
    this.attachService.getTeachers().subscribe(data => this.teachers = data);
    this.attachService.getSubjects().subscribe(data => this.subjects = data);
    this.attachService.getClasses().subscribe(data => this.classes = data);
  }
}
