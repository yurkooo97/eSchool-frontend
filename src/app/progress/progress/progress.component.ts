import { Component, OnInit } from '@angular/core';
import { AdmingroupsService } from 'src/app/services/admingroups.service';
import { Group } from '../../../app/models/group.model';
import { Subject } from 'src/app/models/subjects.model';
import { AdminSubjectsService } from 'src/app/services/admin-subjects.service';
import { StudentsService } from 'src/app/services/admin-students.service';
import { SelectItem } from 'primeng/api';



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
  selectedStudent: any;
  selectedSubjects: any;
  visibleStudents: SelectItem[];
  visibleSubjects: SelectItem[];
  visibleGroups: Group[];
  start: Date;
  end: Date;

  constructor(private groupService: AdmingroupsService,
    private _subjectsService: AdminSubjectsService,
    private studentService: StudentsService) {
    this.visibleGroups = new Array<Group>();
    this.visibleStudents = new Array<SelectItem>();
    
  }


  ngOnInit() {

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
  onSubjectChange() {
    if (this.selectedGroup) {
      this.visibleSubjects = new Array<SelectItem>();
      this._subjectsService.getSubjectsList().subscribe(data => {
        this.visibleSubjects = data.map(function (subject) {
          return {
            label: `${subject}`, value: subject
          };
    }
  }
    }
  }

  onYearChange() {
    if (this.selectedYear) {
      this.visibleGroups = this.groups.filter(g => g.classYear === this.selectedYear);
    } else {
      this.visibleGroups = new Array<Group>();
    }
    this.selectedGroup = null;
    this.onClassChange();
  }

  onClassChange() {
    if (this.selectedGroup) {
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
    }
    this.selectedStudent = null;
  }
}
