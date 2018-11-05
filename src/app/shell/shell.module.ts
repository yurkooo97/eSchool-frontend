import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShellRoutingModule } from './shell-routing.module';
import { ShellComponent } from './shell/shell.component';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';


@NgModule({
  imports: [
    CommonModule,
    ShellRoutingModule,
    ToolbarModule,
    ButtonModule,
    SplitButtonModule,
    MenubarModule,
    MenuModule
  ],
  declarations: [ShellComponent]
})

export class ShellModule { }
