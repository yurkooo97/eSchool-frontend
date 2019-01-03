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
export class JournalDataComponent implements OnInit {

  constructor(private teacherJournalService: TeacherJournalsService) { }

  journalData: JournalData[];
  isActiveJournal: boolean;
  isDataRecived = false;
  scrollableCols: { field: string, header: string } [];
  preventSimpleClick: boolean;
  timerDoubleClick: any;
  markEditValue: string;
  markDescription: string;
  isDisplayDialogVisable = false;
  contextMenuItems: any[];
  selectedMark: {row: JournalData, col: Header};
  frozenCols: Header [] = [
    new Header('studentFullName', 'Студент', '14em'),
    new Header('rating', 'Тип оцінки Середня Рейтинг', '10em') ];

  ngOnInit() {
    this.contextMenuItems = [
      { label: 'Custimize', icon: 'pi pi-edit', command: () => this.changeDescription() },
      { label: 'Delete', icon: 'pi pi-times', command: () => this.deleteMark() }];
    this.subscribeData();
  }
  deleteMark() {
    console.log('delete mark', event, this.selectedMark);
  }
  changeDescription() {
    if (!this.selectedMark || !this.selectedMark.row || !this.selectedMark.row) {
      console.log('Incorrect change description for mark', event, this.selectedMark);  
      this.isDisplayDialogVisable = false;
      return;
    }
    const colomn = +this.selectedMark.col.field;
    if (isNaN(colomn) || colomn === undefined) {
      return;
    } else {
      this.markDescription = this.selectedMark.row.marks[colomn].note;
      this.isDisplayDialogVisable = true;
      
    }
  }

  subscribeData() {
    this.teacherJournalService.journalChanged.subscribe((journal: Journal) => {
      this.teacherJournalService
      .getjournals(journal.idSubject, journal.idClass)
      .subscribe( data => {
        this.journalData = data;
        this.countRating();
        this.scrollableCols = this.journalDeys;
        this.isDataRecived = data.length > 0;
      });
    });
  }

  get journalDeys(): { field: string, header: string } [] {
    if (this.journalData && this.journalData.length > 0) {
      return this.journalData[0].marks.map( (mark, index) => {
        const dayType = mark.typeMark ? mark.typeMark.slice(0, 4) + '/' : ' /';
        const weekDay = this.daysForMonth(mark.dateMark) + '/';
        const day = mark.dateMark.slice(mark.dateMark.indexOf('.') + 1);
        return {field: '' + index, header: dayType + weekDay + day, width: '5em'};
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
  daysForMonth(date: string): string {
    const weakDay = new Date(date).getDay();
    const days = ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пя', 'Сб'];
    return days[weakDay];
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
        if (markValue < 1) {
          return;
        }
        student.marks[mark].mark = '' + markValue;
        this.teacherJournalService.sendMark(student.marks[mark], student.idStudent).subscribe( status => {
          if (status.code && status.code !== 201) {
            console.log(status.message);
          }
        });
        this.countRating();
      }
    }
  }
  onKeydown(event: any) {
    if (event.target.value) {
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
  isMarkColumn(col: string): boolean {
    return !isNaN(+col);
  }
}
class Header {
  constructor(public field: string, public header: string, public width: string) {}
}