import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/models/group.model';
import { NewStudingYearService } from 'src/app/services/new-studing-year.service';
import { ClassId } from 'src/app/models/classId.model';

@Component({
  selector: 'app-new-studing-year',
  templateUrl: './new-studing-year.component.html',
  styleUrls: ['./new-studing-year.component.scss']
})
export class NewStudingYearComponent implements OnInit {

  groupList: Group[];
  newGroupList: Group[];  
  activeGroups: Group[];  
  activeGroupsWithoutYear: Group[];
  newActiveGroups: Group[];
  
  cols: Array<object>;

  buttonSaveDisabled: boolean = true;
  buttonAddDisabled: boolean = false;

  currentYear: number;  
  nextYear: number; 
  
  oldIdArray: Array<number> = [];
  newIdArray: Array<number> = [];
  classIdArray: Array<ClassId> = [];
  newGroupsName: Array<string> = [];  

  constructor(private httpService: NewStudingYearService) { }

  ngOnInit() {
    this.getGroupList();
  }

  getGroupList(){
    this.httpService.getGroups().
      subscribe( data => {
        this.groupList = data;
        console.log(this.groupList);
        this.filterGroups();
      });  
    
    this.cols = [      
      { field: 'className', field2: 'classYear' }
    ]    
  }

  filterGroups(){
    this.activeGroups = this.groupList.filter(g => g.isActive);       
    console.log(this.activeGroups);    
    this.currentYear = this.activeGroups[0].classYear; 
    console.log(this.currentYear);
    
    for(let i=0; i < this.activeGroups.length; i++){
      this.oldIdArray.push(this.activeGroups[i].id);  
    }
    console.log(this.oldIdArray);       
  }
  
  addNewGroups(){
    this.buttonSaveDisabled = false;
    this.buttonAddDisabled = true;    
    this.nextYear = this.currentYear+1;    
    console.log(this.nextYear);    
    this.httpService.postNewGroups().
      subscribe(data => {
        this.newGroupList = data;
        console.log(this.newGroupList);
        this.filterNewGroups();
      })       
  }  

  filterNewGroups(){
    this.activeGroupsWithoutYear = this.newGroupList.filter(gr => gr.isActive);
    this.newActiveGroups = this.activeGroupsWithoutYear.filter(y => y.classYear > this.nextYear-1);
    console.log(this.newActiveGroups);
    
    for(let i=0; i < this.newActiveGroups.length; i++){
      this.newIdArray.push(this.newActiveGroups[i].id);      
      this.newGroupsName.push(this.newActiveGroups[i].className);
    }    
    console.log(this.newGroupsName);
    console.log(this.newIdArray);   

    for(let i=0; i < this.newIdArray.length; i++){      
      this.classIdArray.push({"oldClassId" : this.oldIdArray[i], "newClassId": this.newIdArray[i]});
    }         
    console.log(this.classIdArray);            
  }

  saveGroup(){
    this.buttonSaveDisabled = true;     
      this.httpService.putNewOldId(this.classIdArray).
        subscribe( data => console.log(data));               
  }

}
