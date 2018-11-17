import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputMaskModule } from 'primeng/inputmask';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AutoCompleteModule } from 'primeng/autocomplete';

import { TeachersService } from '../services/teachers.service';
import { AdminSubjectsService } from '../services/admin-subjects.service';
<<<<<<< HEAD
import { InputMaskModule} from 'primeng/inputmask';
=======
import { AdmingroupsService } from '../services/admingroups.service';

import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { StudentsComponent } from './admin-panel/students/students.component';
import { TeachersComponent } from './admin-panel/teachers/teachers.component';
import { GroupsComponent } from './admin-panel/groups/groups.component';
import { SubjectsComponent } from './admin-panel/subjects/subjects.component';
import { AttachTeacherComponent } from './admin-panel/attach-teacher/attach-teacher.component';
>>>>>>> 53eb145c64c009adcba7c0a3d39eec51c6e0330d
import { NewStudingYearComponent } from './admin-panel/new-studing-year/new-studing-year.component';
import { ClassScheduleComponent } from './admin-panel/class-schedule/class-schedule.component';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';


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
<<<<<<< HEAD
		InputMaskModule,
		DropdownModule,
		CalendarModule,
		CardModule,
		FieldsetModule
=======
    MessagesModule,
    MessageModule,
    DropdownModule,
    FileUploadModule,
    InputMaskModule,
    RadioButtonModule,
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteModule
>>>>>>> 53eb145c64c009adcba7c0a3d39eec51c6e0330d
  ],

  providers: [AdmingroupsService, AdminSubjectsService, TeachersService],
  declarations: [
    AdminPanelComponent,
    StudentsComponent,
    TeachersComponent,
    GroupsComponent,
    SubjectsComponent,
    NewStudingYearComponent,
<<<<<<< HEAD
    ClassScheduleComponent
=======
    AttachTeacherComponent
>>>>>>> 53eb145c64c009adcba7c0a3d39eec51c6e0330d
  ]

})
export class AdminPanelModule { }
