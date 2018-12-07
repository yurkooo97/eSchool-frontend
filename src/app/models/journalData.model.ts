export class JournalData {
  idStudent: number;
  marks: {
    dateMark: string;
    idLesson: number;
    mark: string;
    note?: string;
    typeMark: string;
  }[];
  studentFullName: string;

  constructor(id, marks, fullName) {
    this.idStudent = id;
    this.marks = marks;
    this.studentFullName = fullName;
  }
}