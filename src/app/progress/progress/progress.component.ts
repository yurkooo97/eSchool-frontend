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
  selectedGroup: Group; // selectedGroup: Group[];
  selectedYear: any;
  selectedDate: Date;
  selectedStudents: any[];
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

  selectedChartsType = 'student';
  chartMarks = {
    datasets: [
      {
        label: 'First Dataset',
        data: [{ x: 1, y: 2 }, { x: 2, y: 4 }, { x: 3, y: 8 }, { x: 4, y: 16 }],
        fill: false,
        showLine: true,
        borderColor: '#4bc0c0'
      },
      {
        label: 'Second Dataset',
        data: [{ x: 1, y: 3 }, { x: 3, y: 4 }, { x: 4, y: 6 }, { x: 6, y: 9 }],
        fill: false,
        showLine: true,
        borderColor: '#565656'
      }
    ]
  };

  studentMarks: any;
  markDate: any;
  options: any;
  defaultDate = new Date();

  constructor(
    private groupService: AdmingroupsService,
    private _subjectsService: AdminSubjectsService,
    private studentService: StudentsService,
    private marksService: MarksService,
    private _teacherServices: TeachersService
  ) {
    this.isButtonDisabled = true;
    this.visibleGroups = new Array<Group>();
    this.visibleStudents = new Array<SelectItem>();
  }

  ngOnInit() {
    this.calendar();
    /*this.options = {
      scales: {
        yAxes: [{ ticks: { beginAtZero: true, stepValue: 1, max: 12 } }]
      }
    };*/

    this.groupService.getClasses().subscribe(data => {
      this.groups = data;
      const allYears = data.map(group => group.classYear);
      const uniqueYears = allYears
        .filter((value, index, self) => self.indexOf(value) === index)
        .sort();
      this.years = uniqueYears.map(year => ({
        label: year.toString(),
        value: year
      }));
    });
  }

  formatDate(date) {
    const d = new Date(date);
    // const year = d.getFullYear();
    let month = (d.getMonth() + 1).toString();
    let day = d.getDate().toString();
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return [day, month].join('.');
  }

  onClickShow() {
    const pipe = new DatePipe('en-US');
    const startStr = pipe.transform(this.start, 'yyyy-MM-dd');
    const endStr = pipe.transform(this.end, 'yyyy-MM-dd');

    this.chartMarks = {
      datasets: []
    };

    const chartData = {
      datasets: []
    };

    // console.log(this.selectedStudents);
    this.selectedStudents.forEach((item: any) => {
      this.marksService
        .getMarks(
          startStr,
          endStr,
          this.selectedSubjects.subjectId,
          this.selectedGroup.id,
          item.id
        )
        .subscribe(data => {
          console.log(data);
          const studentMarks = data.map(mark => mark.y);
          console.log(studentMarks);
          const markDates = data.map(mark => mark.x);
          
          // chartData.labels = this.joinLabels(chartData.labels, markDates);

          /*chartData.datasets.push({
            label: item.lastname + ' ' + item.firstname,
            data: studentMarks,
            fill: false,
            borderColor: '#7CB342',
            backgroundColor: '#7CB342'
          });*/

          /*this.chartMarks = {
            labels: chartData.labels.map(date => this.formatDate(date)),
            datasets: chartData.datasets
          };*/

          // this.chartMarks.labels = this.markDate;
          /*chartMarksLocal.datasets.push({
            label: item.lastname + ' ' + item.firstname,
            data: this.studentMarks,
            fill: false,
            borderColor: '#4bc0c0'
          });*/
        });
    });
    /*this.marksService
      .getAvgMarks(this.selectedStudent.id, startStr, endStr)
      .subscribe(data => {
        this.avgMark = data;
        this.avgMarkAllSubjects = this.StudentAverageMark(
          data.map(mark => mark.avgMark)
        );
        const subject = data.find(
          i => i.subjectId === this.selectedSubjects.subjectId
        );
        this.average = subject ? subject.avgMark : null;
      });*/
  }

  joinLabels(dates1: any, dates2: any) {
    return Array.from(new Set(dates1.concat(dates2))).sort(
      (a: any, b: any) => new Date(a).getTime() - new Date(b).getTime()
    );
  }

  onSubjectChange() {
    this.updateIsButtonDisabled();
  }

  onYearChange() {
    if (this.selectedYear) {
      this.start = new Date(this.selectedYear, 0);
      this.end =
        new Date().getFullYear() === this.selectedYear
          ? new Date()
          : new Date(this.selectedYear, 1);
      this.visibleGroups = this.groups.filter(
        g => g.classYear === this.selectedYear
      );
    } else {
      this.visibleGroups = new Array<Group>();
      this.start = null;
      this.end = null;
      this.average = null;
      this.avgMarkAllSubjects = null;
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
      this._subjectsService
        .getSubjectsListForClass(this.selectedGroup.id)
        .subscribe(data => {
          this.visibleSubjects = data.map(function(subject) {
            return {
              label: `${subject.subjectName}`,
              value: subject
            };
          });
        });
      this.visibleStudents = new Array<SelectItem>();
      this.studentService.getStudents(this.selectedGroup.id).subscribe(data => {
        this.visibleStudents = data.map(function(student) {
          return {
            label: `${student.firstname} ${student.lastname}`,
            value: student
          };
        });
      });
    } else {
      this.visibleStudents = new Array<SelectItem>();
      this.visibleSubjects = new Array<SelectItem>();
    }
    this.selectedStudents = [];
    this.updateIsButtonDisabled();
  }

  StudentAverageMark(marks): number {
    let summ = 0;
    for (let i = 0; i < marks.length; i++) {
      summ += marks[i];
    }
    return summ / marks.length;
  }

  calendar(): void {
    this._teacherServices.currentCalendar.subscribe(data => (this.ua = data));
  }

  updateIsButtonDisabled() {
    this.isButtonDisabled = !(
      this.selectedSubjects != null &&
      this.selectedYear != null &&
      this.selectedGroup != null &&
      this.selectedStudents != null
    );
  }
}
