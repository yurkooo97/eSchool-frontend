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
import { InputMaskModule } from 'primeng/inputmask';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { StudentsComponent } from './admin-panel/students/students.component';
import { TeachersComponent } from './admin-panel/teachers/teachers.component';
import { GroupsComponent } from './admin-panel/groups/groups.component';
import { SubjectsComponent } from './admin-panel/subjects/subjects.component';
import { NewEduYearComponent } from './admin-panel/new-edu-year/new-edu-year.component';

import { AdmingroupsService } from '../services/admingroups.service';
import { TeachersService } from "../services/teachers.service";
import { AdminSubjectsService } from '../services/admin-subjects.service';


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
    InputMaskModule,
    RadioButtonModule,
    FormsModule,
    ReactiveFormsModule 
  ],
  providers: [AdmingroupsService, AdminSubjectsService, TeachersService],
  declarations: [AdminPanelComponent, StudentsComponent, TeachersComponent, GroupsComponent, SubjectsComponent, NewEduYearComponent]


})
export class AdminPanelModule {}
