import { Component, OnInit } from '@angular/core';
import { AdminSubjectsService } from 'src/app/services/admin-subjects.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {


  loading:boolean;

  displayDialog: boolean;

  subject  = {};

  selectedSubject;

  newSubject: boolean;

  subjects;

  cols;


  constructor(private _subjectsService:AdminSubjectsService) { }

    ngOnInit() {
        this.loading = true;
        this._subjectsService.getSubjectsList().subscribe(data=>this.subjects=data);
        
        this.cols = [
            { field: 'subjectName', header: 'Назва' },
            { field: 'subjectDescription', header: 'Опис' }
        ];

        this.loading = false;

    }

    showDialogToAdd() {
        this.newSubject = true;
        this.subject = {};
        this.displayDialog = true;
    }

    create(){
        this.displayDialog = false;
        this._subjectsService.postSubject(this.subject).subscribe(
            subject =>this.subjects.push(subject),
            err=>console.error(err)
        );
    }

    save() {
        this.displayDialog = false;
        this._subjectsService.putSubject(this.subject).subscribe(
            subject =>{
                let subjects = [...this.subjects];
                subjects[this.subjects.indexOf(this.selectedSubject)] = subject;
                this.subjects = subjects;
            },
            err=>console.error(err)
        );
        this.subject = null;
    }

    delete() {
        let index = this.subjects.indexOf(this.selectedSubject);
        this.subjects = this.subjects.filter((val, i) => i != index);
        this._subjectsService.deleteSubject(this.subject).subscribe(
            subject =>console.log(subject),
            err=>console.error(err)
        );
        this.subject = null;
        this.displayDialog = false;
    }

    onRowSelect(event) {
        this.newSubject = false;
        this.subject = this.cloneSubject(event.data);
        this.displayDialog = true;
    }

    cloneSubject(c) {
        let subject = {};
        for (let prop in c) {
        subject[prop] = c[prop];
        }
        return subject;
    }
}
