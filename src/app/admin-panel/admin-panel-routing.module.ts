import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { StudentsComponent } from './admin-panel/students/students.component';
import { GroupsComponent } from './admin-panel/groups/groups.component';
import { SubjectsComponent } from './admin-panel/subjects/subjects.component';
import { TeachersComponent } from './admin-panel/teachers/teachers.component';
import { NewEduYearComponent } from './admin-panel/new-edu-year/new-edu-year.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPanelComponent,
    children:[{ 
      path:'students',
      component:StudentsComponent
    },
    { 
    
      path:'groups',
      component:GroupsComponent
    },
    {
      path:'subjects',
      component:SubjectsComponent
    },
    {
      path:'teachers',
      component:TeachersComponent
    },
    {
      path:'newEducationalYear',
      component: NewEduYearComponent
    },
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }
