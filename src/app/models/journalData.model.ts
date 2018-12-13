export class JournalData {
  idStudent: number;
  marks: {
    dateMark: string;
    idLesson: number;
    mark: string;
    note?: string;
    typeMark: string;
    isEdit?: boolean;
    isSelected?: boolean
  }[];
  studentFullName: string;

  constructor(id, marks, fullName) {
    this.idStudent = id;
    this.marks = marks.map( mark => {
      mark.isEdit = false;
      mark.isSelected = false;
      return mark;
    });
    this.studentFullName = fullName;

  }
}
