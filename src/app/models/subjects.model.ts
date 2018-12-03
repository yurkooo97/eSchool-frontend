export class Subject {
  subjectId?: number;
  subjectName: string;
  subjectDescription: string;

  constructor(subjectId?, subjectName?) {
    this.subjectId = subjectId;
    this.subjectName = subjectName;
  }
}
