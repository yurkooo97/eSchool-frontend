import { Component, OnInit } from '@angular/core';
import { AdmingroupsService } from 'src/app/services/admingroups.service';
import { MarksService } from 'src/app/services/marks.service';
import { AdminSubjectsService } from 'src/app/services/admin-subjects.service';
import { StudentsService } from 'src/app/services/admin-students.service';
import { SelectItem } from 'primeng/api';
import { Group } from '../../../app/models/group.model';
import { Subject } from 'src/app/models/subjects.model';
import { DatePipe } from '@angular/common';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {

  years: SelectItem[];
  groups: Group[];
  subjects: Subject[];
  classID: number;
  selectedGroup: any;
  selectedYear: any;
  selectedDate: Date;
  selectedStudent: any;
  selectedSubjects: any;
  visibleStudents: SelectItem[];
  visibleSubjects: SelectItem[];
  visibleGroups: Group[];
  start: Date;
  end: Date;
  marks: any;
  disabled = true;
  average: number;
  ua: any;
  avgMark: number[];
  avgMarkAllSubjects: number;
  isButtonDisabled: boolean;

  constructor(
    private groupService: AdmingroupsService,
    private _subjectsService: AdminSubjectsService,
    private studentService: StudentsService,
    private marksService: MarksService,
    private _teacherServices: TeachersService) {
    this.isButtonDisabled = true;
    this.visibleGroups = new Array<Group>();
    this.visibleStudents = new Array<SelectItem>();
  }

  ngOnInit() {
    this.calendar();

    this.groupService.getClasses()
      .subscribe(data => {
        this.groups = data;
        const allYears = data.map(group => group.classYear);
        const uniqueYears = allYears.filter((value, index, self) => self.indexOf(value) === index)
          .sort();
        this.years = uniqueYears
          .map(year => ({ label: year.toString(), value: year }));
      });
  }

  onStartDateChange() { }

  onEndDateChange() {
    const pipe = new DatePipe('en-US');
    const startStr = pipe.transform(this.start, 'yyyy-MM-dd');
    const endStr = pipe.transform(this.end, 'yyyy-MM-dd');
    this.marksService.getMarks(startStr, endStr, this.selectedSubjects.subjectId, this.selectedGroup.id, this.selectedStudent.id)
      .subscribe(data => {
        const marks = data.map(mark => mark.y);
       });
    this.marksService.getAvgMarks(this.selectedStudent.id, startStr, endStr).subscribe(data => {
      this.avgMark = data;
      this.avgMarkAllSubjects = this.StudentAverageMark(data.map(mark => mark.avgMark));
      this.average = data.find(i => i.subjectId = this.selectedSubjects.subjectId).avgMark;
    });
  }

  onSubjectChange() {
    this.updateIsButtonDisabled();
  }

  onYearChange() {
    if (this.selectedYear) {
      this.start = new Date(this.selectedYear, 0);
      this.end = new Date(this.selectedYear, 1);
      this.visibleGroups = this.groups.filter(g => g.classYear === this.selectedYear);
    } else {
      this.visibleGroups = new Array<Group>();
      this.start = null;
    }
    this.selectedGroup = null;
    this.onClassChange();
    this.updateIsButtonDisabled();
  }

  onStudentChange() {
    this.updateIsButtonDisabled();
   }

  onClassChange() {
    if (this.selectedGroup) {
      this._subjectsService.getSubjectsListForClass(this.selectedGroup.id).subscribe(data => {
        this.visibleSubjects = data.map(function (subject) {
          return {
            label: `${subject.subjectName}`, value: subject
          };
        });
      });
      this.visibleStudents = new Array<SelectItem>();
      this.studentService.getStudents(this.selectedGroup.id).subscribe(data => {
        this.visibleStudents = data['data'].map(function (student) {
          return {
            label: `${student.firstname} ${student.lastname}`, value: student
          };
        });
      });
    } else {
      this.visibleStudents = new Array<SelectItem>();
      this.visibleSubjects = new Array<SelectItem>();
    }
    this.selectedStudent = null;
    this.updateIsButtonDisabled();
  }

  StudentAverageMark(marks): number {
    let summ = 0;
    for (let i = 0; i < marks.length; i++) {
      summ += marks[i];
    }
    return  summ / marks.length;
  }

  calendar(): void {
    this._teacherServices.currentCalendar.subscribe(data => this.ua = data);
  }

  updateIsButtonDisabled() {
    this.isButtonDisabled =  !(this.selectedYear  != null && this.selectedGroup != null && this.selectedStudent != null);
  }
}
