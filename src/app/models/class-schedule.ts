import { Group } from 'src/app/models/group.model';
import { Subject } from 'src/app/models/subjects.model';

export class Schedule {
  className: Group;

  startOfSemester: string;
  endOfSemester: string;

  mondaySubjects: Subject[];
  tuesdaySubjects: Subject[];
  wednesdaySubjects: Subject[];
  thursdaySubjects: Subject[];
  fridaySubjects: Subject[];
  saturdaySubjects: Subject[];
}
