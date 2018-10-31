import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JournalRoutingModule } from './journal-routing.module';
import { JournalComponent } from './journal/journal.component';

@NgModule({
  imports: [
    CommonModule,
    JournalRoutingModule
  ],
  declarations: [JournalComponent]
})
export class JournalModule { }
