import { Component, OnInit } from '@angular/core';
import { HttpAttachTeacherService } from 'src/app/services/http-attach-teacher.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private students: number;
  private teachers: number;
  private classes: number;
  private subjects: number;

  constructor(private http: HttpAttachTeacherService) { }

  ngOnInit() {
    this.http.getClasses().subscribe(data => {
      const activeClasses = data.filter((classes) => classes.isActive === true);
      this.classes = activeClasses.length;
      this.students = activeClasses.reduce((sumStudents, currentClass) => sumStudents + currentClass.numOfStudents, 0);
    });
    this.http.getTeachers().subscribe(data => this.teachers = data.length);
    this.http.getSubjects().subscribe(data => this.subjects = data.length);
  }

}
