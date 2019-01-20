import { Component, OnInit } from '@angular/core';
import { AdmingroupsService } from 'src/app/services/admingroups.service';
import { MarksService } from 'src/app/services/marks.service';
import { AdminSubjectsService } from 'src/app/services/admin-subjects.service';
import { StudentsService } from 'src/app/services/admin-students.service';
import { SelectItem } from 'primeng/api';
import { Group } from '../../../app/models/group.model';
import { Subject } from 'src/app/models/subjects.model';
import { DatePipe, formatDate } from '@angular/common';
import { TeachersService } from 'src/app/services/teachers.service';
import { DataSharingService } from 'src/app/services/data-sharing.service';

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
  selectedGroups: Group[];
  selectedGroup: Group;
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
  chartMarks: any;

  chartOptions: any;
  defaultDate = new Date();
  color = new ChartColor();

  constructor(
    private groupService: AdmingroupsService,
    private notificationToasts: DataSharingService,
    private _subjectsService: AdminSubjectsService,
    private studentService: StudentsService,
    private marksService: MarksService,
    private _teacherServices: TeachersService
  ) {
    this.isButtonDisabled = true;
    this.visibleGroups = new Array<Group>();
    this.visibleStudents = new Array<SelectItem>();
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 0
      },
      hover: {
        animationDuration: 0
      },
      responsiveAnimationDuration: 0,
      scales: {
        yAxes: [
          {
            display: true,
            ticks: {
              beginAtZero: true,
              stepValue: 1,
              max: 12
            },
            scaleLabel: {
              display: true,
              labelString: 'Оцінка'
            }
          }
        ],
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: 'Період'
            }
          }
        ]
      }
    };
  }

  ngOnInit() {
    this.calendar();

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

  // writing everage marks to the chartMarks object for each selected student
  funcProceedServerAnswer(servData, firstname, lastname, startDate, endDate) {
    const marksData = [];
    let sum = 0;
    servData.forEach((value: any) => {
      sum += value.y;
    });
    const averageMark = sum / servData.length;
    marksData.push(averageMark.toFixed(2));

    // saving already loaded datasets into a local variable to update full chartMarks later
    const datasetsLocal = this.chartMarks.datasets;
    datasetsLocal.push({
      label: firstname + ' ' + lastname,
      data: marksData,
      backgroundColor: this.color.getColor(),
      borderColor: 'white'
    });

    const pipe = new DatePipe('en-US');
    startDate = pipe.transform(startDate, 'dd.MM.yyyy');
    endDate = pipe.transform(endDate, 'dd.MM.yyyy');

    const newDatasetsLocal = datasetsLocal.sort(function(b, a) {
      return a.data - b.data;
    });

    // fully update chartMarks
    this.chartMarks = {
      labels: [`${startDate} - ${endDate}`],
      datasets: newDatasetsLocal
    };
  }

  // showing toast-message for students who do not have marks
  showToasts(servData, firstname, lastname) {
    if (servData.length === 0) {
      this.notificationToasts.notify(
        'warn',
        '',
        ` Для учня ${firstname} ${lastname} за даний період оцінки відсутні`
      );
    }
  }

  onClickShow() {
    const pipe = new DatePipe('en-US');
    const startStr = pipe.transform(this.start, 'yyyy-MM-dd');
    const endStr = pipe.transform(this.end, 'yyyy-MM-dd');

    this.chartMarks = {
      labels: [],
      datasets: []
    };

    // getting data for each selected student
    if (this.selectedStudents) {
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
            this.funcProceedServerAnswer(
              data,
              item.firstname,
              item.lastname,
              startStr,
              endStr
            );
            this.showToasts(data, item.firstname, item.lastname);
          });
      });
    }

    if (this.selectedStudents.length === 1) {
      this.marksService
        .getAvgMarks(this.selectedStudents[0].id, startStr, endStr)
        .subscribe(data => {
          this.avgMark = data;
          this.avgMarkAllSubjects = this.StudentAverageMark(
            data.map(mark => mark.avgMark)
          );
          const subject = data.find(
            i => i.subjectId === this.selectedSubjects.subjectId
          );
          this.average = subject ? subject.avgMark : null;
        });
    }
    // reset average marks when selected more than one student
    this.average = null;
    this.avgMarkAllSubjects = null;
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
      (this.selectedGroup != null || this.selectedGroups.length > 0) &&
      this.selectedStudents.length > 0
    );
  }
}

class ChartColor {
  private colors = ['green', 'red', 'orange', 'blue', 'purple'];
  private count = -1;

  getColor() {
    if (this.count === this.colors.length - 1) {
      this.count = -1;
    }
    this.count++;
    return this.colors[this.count];
  }
}
