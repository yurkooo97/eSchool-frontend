import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FieldsetModule } from 'primeng/fieldset';
import { RadioButtonModule } from 'primeng/radiobutton';



import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { StudentsComponent } from './admin-panel/students/students.component';
import { TeachersComponent } from './admin-panel/teachers/teachers.component';
import { GroupsComponent } from './admin-panel/groups/groups.component';
import { SubjectsComponent } from './admin-panel/subjects/subjects.component';



import { AdmingroupsService } from '../services/admingroups.service';
import { AdminSubjectsService } from '../services/admin-subjects.service';
import { NewEduYearComponent } from './admin-panel/new-edu-year/new-edu-year.component';

@NgModule({
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    MenuModule,
    TableModule,
    ButtonModule,
    FieldsetModule,
    DialogModule,
    InputTextModule,
    InputTextareaModule,
    RadioButtonModule,
    FormsModule,
    ReactiveFormsModule 
  ],
  providers: [AdmingroupsService, AdminSubjectsService],
  declarations: [AdminPanelComponent, StudentsComponent, TeachersComponent, GroupsComponent, SubjectsComponent, NewEduYearComponent]
})
export class AdminPanelModule { }
