import { Mark } from './journalMark.model';

export class JournalData {
  idStudent: number;
  marks: Mark[];
  studentFullName: string;

  constructor(id: number, marks: Mark[], fullName: string) {
    this.idStudent = id;
    this.marks = marks.map( mark => {
      mark.isEdit = false;
      mark.isSelected = false;
      return mark;
    });
    this.studentFullName = fullName;

  }
}
