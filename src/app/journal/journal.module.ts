import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JournalRoutingModule } from './journal-routing.module';
import { JournalComponent } from './journal/journal.component';
import { MenuComponent } from './journal/menu/menu.component';
import { HometaskComponent } from './journal/hometask/hometask.component';
import { FormsModule } from '@angular/forms';

import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';
import {DataViewModule} from 'primeng/dataview';

@NgModule({
  imports: [
    CommonModule,
    JournalRoutingModule,
    ToolbarModule,
    DropdownModule,
    FormsModule,
    DataViewModule
  ],
  declarations: [JournalComponent, MenuComponent, HometaskComponent]
})
export class JournalModule { }
