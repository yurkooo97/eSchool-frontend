import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/models/group.model';
import { NewStudingYearService } from 'src/app/services/new-studing-year.service';
import { ClassId } from 'src/app/models/classId.model';
import { Transition } from 'src/app/models/transitional-studing.model';
//import { IterableChangeRecord_ } from '@angular/core/src/change_detection/differs/default_iterable_differ';
import { NewGroup } from 'src/app/models/transitional-groups.model';


@Component({
  selector: 'app-new-studing-year',
  templateUrl: './new-studing-year.component.html',
  styleUrls: ['./new-studing-year.component.scss']
})
export class NewStudingYearComponent implements OnInit {
  groupList: NewGroup[];
  newGroupList: NewGroup[];
  activeGroups: NewGroup[];
  activeGroupsWithoutYear: NewGroup[];
  newActiveGroups: NewGroup[];
  cols: Array<object>;
  buttonSaveDisabled: boolean = true;
  buttonAddDisabled: boolean = false;
  currentYear: number;
  nextYear: number;
  oldIdArray: Array<number> = [];
  newIdArray: Array<number> = [];
  classIdArray: Array<ClassId> = [];
  oldGroupsName: Array<string> = []; 
  newGroupsName: Array<string> = [];
  allGroupsList: Array<Transition> = [];

  groupDigitsArray: Array<number> = [];

  constructor(private httpService: NewStudingYearService) {}

  ngOnInit() {
    this.getGroupList();
  }
  getGroupList() {
    this.httpService.getGroups().subscribe(data => {
      this.groupList = data;
      this.filterGroups();      
    });
    this.cols = [{ field: 'className', field2: 'classYear', field3: 
  'newClassName' , field4: 'newClassYear' }];
  }
  filterGroups() {
    this.activeGroups = this.groupList.filter(g => g.isActive);
    this.currentYear = this.activeGroups[0].classYear;
    this.activeGroups.forEach((item, i) => {
      this.oldIdArray.push(item.id);      

      this.allGroupsList.push({
        oldClassId: item.id,
        className: item.className,
        classYear: item.classYear,
        isActive: item.isActive,
        numOfStudents: item.numOfStudents,
        newClassId: null,
        newClassName: null,
        newClassYear: null        
      })

    });

    console.log(this.allGroupsList);

    
  }
  addNewGroups() {    
    this.nextYear = this.currentYear + 1;
    this.httpService.postNewGroups().subscribe(data => {
      this.newGroupList = data;
      console.log(this.newGroupList);
      this.filterNewGroups();
      //console.log(this.classIdArray);
      this.httpService.putNewOldId(this.classIdArray).subscribe(data2 => console.log(data2));

    });
  }
  displayNewGroups(){
    this.buttonSaveDisabled = false;
    this.buttonAddDisabled = true;
    this.transitNamesOfGroups();

  ;

  };
  filterNewGroups() {
    this.activeGroupsWithoutYear = this.newGroupList.filter(gr => gr.isActive);
    this.newActiveGroups = this.activeGroupsWithoutYear.filter(
      y => y.classYear > this.nextYear - 1
    );


    this.newActiveGroups.forEach(
      (item, i) =>{
        this.newIdArray.push(item.id); /*& this.newGroupsName.push(item.className)*/


        this.allGroupsList[i].newClassName = item.className;
        this.allGroupsList[i].newClassYear = this.nextYear;
      }
    
        
    );
    
    console.log(this.allGroupsList);

    this.newIdArray.forEach((item, i) =>
      this.classIdArray.push({
        oldClassId: this.oldIdArray[i],
        newClassId: item
      })
    );

    console.log(this.classIdArray);
    
  }
  saveGroup() {
    this.buttonSaveDisabled = true;    
    this.addNewGroups();            
  }

  transitNamesOfGroups(){
    /* this.activeGroups.forEach((item, i) => 
      this.allGroupsArr.push({
        
      })
    ) */
    
    
    //console.log(this.oldGroupsName);

  /* this.oldGroupsName.forEach((item, i) =>
    this.newGroupsName.push(this.oldGroupsName[i].split("-")) */
  };
  
}
