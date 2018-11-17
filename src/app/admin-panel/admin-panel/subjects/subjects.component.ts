import { Component, OnInit } from "@angular/core";
import { AdminSubjectsService } from "src/app/services/admin-subjects.service";
import { Subject } from "src/app/models/subjects.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-subjects",
  templateUrl: "./subjects.component.html",
  styleUrls: ["./subjects.component.scss"]
})
export class SubjectsComponent implements OnInit {
  subjectForm: FormGroup;

  submitted = false;

  loading: boolean;

  displayDialog: boolean;

  subject: any;

  selectedSubject: Subject;

  newSubject: boolean;

  subjects: Subject[];

  cols: Array<object>;

  constructor(
    private _subjectsService: AdminSubjectsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.loading = true;
    this._subjectsService
      .getSubjectsList()
      .subscribe(data => {
        this.subjects = data
        this.loading = false;
      });
    this.cols = [
      {
        field: "subjectName",
        header: "Назва"
      },
      {
        field: "subjectDescription",
        header: "Опис"
      }
    ];
    this.subjectForm = this.formBuilder.group({
      subjectName: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
          Validators.pattern("[А-ЯІЇЄҐ]([А-ЯІЇЄҐ]*[а-яіїєґ]*[' -]?)+")
        ])
      ],
      subjectDescription: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(300)
        ])
      ]
    });
  }

  get f() {
    return this.subjectForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.subjectForm.setValue({
      subjectName: this.subject.subjectName,
      subjectDescription: this.subject.subjectDescription
	});
	
    if (this.subjectForm.invalid) {
      return;
    }
    if (this.newSubject) {
      this.create();
    } else {
      this.save();
    }
  }

  showDialogToAdd() {
    this.submitted = false;
    this.newSubject = true;
    this.subject = {};
    this.displayDialog = true;
  }

  create() {
    this.displayDialog = false;
    this._subjectsService
      .postSubject(this.subject)
      .subscribe(
        subject => this.subjects.push(subject),
        err => console.error(err)
      );
  }

  save() {
    this.displayDialog = false;
    this._subjectsService.putSubject(this.subject).subscribe(
      subject => {
        const subjects = [...this.subjects];
        subjects[this.subjects.indexOf(this.selectedSubject)] = subject;
		    this.subjects = subjects;
	    	this.ngOnInit();
      },
      err => console.error(err)
    );
    this.subject = null;
  }

  onRowSelect(rowData) {
    this.submitted = false;
    this.newSubject = false;
    this.subject = {
      ...rowData
    };
    this.displayDialog = true;
  }
}