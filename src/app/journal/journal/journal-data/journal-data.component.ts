import { Component, OnInit, OnDestroy } from '@angular/core';
import { TeacherJournalsService } from 'src/app/services/teacher-journals.service';
import { JournalData } from 'src/app/models/journalData.model';
import { Journal } from 'src/app/models/journal.model';
import { Mark } from 'src/app/models/journalMark.model';

@Component({
  selector: 'app-journal-data',
  templateUrl: './journal-data.component.html',
  styleUrls: ['./journal-data.component.scss']
})
export class JournalDataComponent implements OnInit, OnDestroy {

  constructor(private teacherJournalService: TeacherJournalsService) { }

  journalData: JournalData[];
  isActiveJournal: boolean;
  isDataRecived = false;
  scrollableCols: { field: string, header: string } [];
  preventSimpleClick: boolean;
  timerDoubleClick: any;
  markEditValue: string;
  isDisplayDialogVisable = false;
  contextMenuItems: any[];
  selectedMark: Mark;
  frozenCols: { field: string, header: string, width: string } [] = [
    {field: 'studentFullName', header: 'Студент', width: '14em'},
    {field: 'rating', header: 'Рейтинг Підсумок', width: '6em'}];

  ngOnInit() {
    this.contextMenuItems = [
      { label: 'Custimize', icon: 'pi pi-edit', command: (event) => this.changeDescription(event, 1) },
      { label: 'Delete', icon: 'pi pi-times', command: (event) => this.deleteMark(event, 1) }];
      console.log(this.contextMenuItems.length);
    this.subscribeData();
  }
  deleteMark(student, indexMark) {
    console.log('delete mark', student, indexMark);
  }
  changeDescription(student, indexMark) {
    console.log('change description for mark', student, indexMark);
  }

  subscribeData() {
    this.teacherJournalService.journalChanged.subscribe((journal: Journal) => {
      this.teacherJournalService
      .getjournals(journal.idSubject, journal.idClass)
      .subscribe( data => {
        this.journalData = data;
        this.countRating();
        this.scrollableCols = this.journalDeys;
        this.isDataRecived = true;
      });
    });
  }

  get journalDeys(): { field: string, header: string } [] {
    if (this.journalData) {
      return this.journalData[0].marks.map( (mark, index) => {
        const dayType = mark.typeMark ? mark.typeMark.slice(0, 4) + '/' : ' /';
        const weekDay = this.daysForMonth(mark.dateMark) + '/';
        const day = mark.dateMark.slice(mark.dateMark.indexOf('.') + 1);
        return {field: '' + index, header: weekDay + day, width: '5em'};
      });
    } else {
      console.log('Journal data is empty!');
      return;
    }
  }
  countRating() {
    this.journalData = this.journalData.map(student => {
      let totalRating = 0;
      let countMarks = 0;
      let countSelected = 0;
      let totalSelected = 0;
      student.marks.forEach( mark => {
        if (mark.mark) {
          countMarks++;
          totalRating = totalRating + +mark.mark;
          if (mark.isSelected) {
            totalSelected = totalSelected + +mark.mark;
            countSelected++;
          }
        }
      });
      const prepareStudent = new JournalData(student.idStudent, student.marks, student.studentFullName);
      if (totalRating > 0) {
        prepareStudent.rating[0] = (totalRating / countMarks);
      }
      if (countSelected > 0) {
        prepareStudent.rating[1] = (totalSelected / countSelected);
      }
      return prepareStudent;
    });
  }
  daysForMonth(date: string) {
    const weakDay = new Date(date).getDay();
    const days = ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пя', 'Сб'];
    return days[weakDay];
  }
  ngOnDestroy(): void {
    this.teacherJournalService.journalChanged.unsubscribe();
  }

  markStudent(student: JournalData, markIndex: number): string {
    if (!isNaN(markIndex)) {
      const mark = student.marks[markIndex].mark;
      if (mark) {
        return mark;
      } else {
        return '';
      }
    } else {
      return student[markIndex];
    }
  }
  singleClick(student: JournalData, mark: number) {
    if (isNaN(mark)) {
      return;
    }
    if (student.marks[mark].isEdit) {
      return;
    }
    this.preventSimpleClick = false;
    const delay = 200;
    this.timerDoubleClick = setTimeout(() => {
      if (!this.preventSimpleClick) {
        this.selected(student, mark);
      }
    }, delay);
  }
  doubleClick(student: JournalData, mark: number) {
    this.preventSimpleClick = true;
    clearTimeout(this.timerDoubleClick);
    this.edit(student, mark);
  }
  selected(student: JournalData, mark: any) {
    if (student.marks[mark].mark) {
      student.marks[mark].isSelected = !(student.marks[mark].isSelected);
      this.teacherJournalService.markSelect(student.marks[mark]);
      this.countRating();
    }
  }
  edit(student: JournalData, mark: number) {
    if (isNaN(mark)) {
      return;
    }
      student.marks[mark].isEdit = true;
      student.marks[mark].isSelected = false;
  }
  isEditMode(student: JournalData, mark: number): boolean {
    if (student.marks[mark]) {
      if (student.marks[mark].isEdit) {
        return student.marks[mark].isEdit;
      }
    }
  }
  isSelected(student: JournalData, mark: number): boolean {
    return ((student.marks[mark]) && (student.marks[mark].isSelected) && student.marks[mark].isSelected);
  }
  markEditExit(student: JournalData, mark: number) {
    if (student.marks[mark]) {
      if (student.marks[mark].isEdit) {
        student.marks[mark].isEdit = false;
        this.markEditValue = '';
        let markValue = +student.marks[mark].mark;
        if (markValue > 12) {
          markValue = 12;
        }
        student.marks[mark].mark = '' + markValue;
        this.teacherJournalService.sendMark(student.marks[mark], student.idStudent).subscribe( status => {
          if (status.code) {
            console.log(status);
          }
        });
        this.countRating();
      }
    }
  }
  onKeydown(event: any) {
    if (event.target.value) {
      console.log('keydown:', event.target.value);
        if (+event.target.value > 12) {
          event.target.value = '12';
          return false;
      }
    }
  }
  resetMarks(marks: Mark[]): Mark[] {
    return marks.map( mark => {
      mark.isSelected = false;
      mark.isEdit = false;
      return mark;
    });
  }
}
