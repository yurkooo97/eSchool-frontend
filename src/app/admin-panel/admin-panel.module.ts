import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { InputMaskModule } from 'primeng/inputmask';

import { NewStudingYearComponent } from './admin-panel/new-studing-year/new-studing-year.component';
import { TeachersService } from "../services/teachers.service";
import { AdminSubjectsService } from '../services/admin-subjects.service';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { StudentsComponent } from './admin-panel/students/students.component';
import { TeachersComponent } from './admin-panel/teachers/teachers.component';
import { GroupsComponent } from './admin-panel/groups/groups.component';
import { SubjectsComponent } from './admin-panel/subjects/subjects.component';

@NgModule({
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    MenuModule,
    TableModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    MessagesModule,
    MessageModule,
    DropdownModule,
    FieldsetModule,
    FileUploadModule,
    InputMaskModule
  ],
  providers: [TeachersService,AdminSubjectsService],
  declarations: [
    AdminPanelComponent,
    StudentsComponent,
    TeachersComponent,
    GroupsComponent,
    SubjectsComponent,
    NewStudingYearComponent
  ]
})
export class AdminPanelModule {}
