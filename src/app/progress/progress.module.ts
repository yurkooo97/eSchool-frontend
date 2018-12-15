import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';

import { ProgressRoutingModule } from './progress-routing.module';
import { ProgressComponent } from './progress/progress.component';
import { ChartModule } from 'primeng/chart';

@NgModule({
  imports: [
    CommonModule,
    ProgressRoutingModule,
    DropdownModule,
    FormsModule,
    CalendarModule,
		ButtonModule,
		ChartModule
  ],
  declarations: [ProgressComponent]
})
export class ProgressModule { }
