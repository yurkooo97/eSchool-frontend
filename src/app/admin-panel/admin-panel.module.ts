
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MenuModule } from "primeng/menu";
import { AdminPanelRoutingModule } from "./admin-panel-routing.module";
import { TableModule } from "primeng/table";
import { DialogModule } from "primeng/dialog";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { TeachersService } from "../services/teachers.service";
import { AdminPanelComponent } from "./admin-panel/admin-panel.component";
import { StudentsComponent } from "./admin-panel/students/students.component";
import { TeachersComponent } from "./admin-panel/teachers/teachers.component";
import { GroupsComponent } from "./admin-panel/groups/groups.component";
import { SubjectsComponent } from "./admin-panel/subjects/subjects.component";
import {InputTextareaModule} from 'primeng/inputtextarea';
import { AdminSubjectsService } from '../services/admin-subjects.service';
import { InputMaskModule} from 'primeng/inputmask';
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
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
		InputMaskModule,
		DropdownModule,
		CalendarModule,
		CardModule,
		FieldsetModule
  ],
  providers: [TeachersService,AdminSubjectsService],
  declarations: [
    AdminPanelComponent,
    StudentsComponent,
    TeachersComponent,
    GroupsComponent,
    SubjectsComponent,
    NewStudingYearComponent,
    ClassScheduleComponent
  ]
})
export class AdminPanelModule {}
