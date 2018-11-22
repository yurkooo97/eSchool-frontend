import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from 'src/app/models/group.model';
import { NewStudingYearService } from 'src/app/services/new-studing-year.service';

@Component({
  selector: 'app-new-studing-year',
  templateUrl: './new-studing-year.component.html',
  styleUrls: ['./new-studing-year.component.scss']
})
export class NewStudingYearComponent implements OnInit {

  groupList: Group[];
  activeGroups: Group[];
  inactiveGroups: Group[];
  groups: Group[];

  constructor(private httpService: NewStudingYearService) { }

  ngOnInit() {
  }

  getGroupList(){
    this.httpService.getGroups().subscribe( data => this.groupList = data);
    // this.filterGroups();
  }

  filterGroups(){
    this.activeGroups = this.groups.filter(g => g.isActive);
    this.inactiveGroups = this.groups.filter(g => !g.isActive);
  }

}
