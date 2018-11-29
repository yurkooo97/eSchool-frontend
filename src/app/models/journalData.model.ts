export class JournalData {
  idStudent: number;
  marks: [{
    dateMark: string;
    idLesson: number;
    mark: string;
    note?: string;
    typeMark: string;
  }];
  studentFullName: string;
}