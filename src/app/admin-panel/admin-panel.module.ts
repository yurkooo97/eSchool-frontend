import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MenuModule} from 'primeng/menu';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

@NgModule({
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    MenuModule
  ],
  declarations: [AdminPanelComponent]
})
export class AdminPanelModule { }
