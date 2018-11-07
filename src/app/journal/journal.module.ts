import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JournalRoutingModule } from './journal-routing.module';
import { JournalComponent } from './journal/journal.component';
import { MenuComponent } from './journal/menu/menu.component';
import { HometaskComponent } from './journal/hometask/hometask.component';

@NgModule({
  imports: [
    CommonModule,
    JournalRoutingModule
  ],
  declarations: [JournalComponent, MenuComponent, HometaskComponent]
})
export class JournalModule { }
