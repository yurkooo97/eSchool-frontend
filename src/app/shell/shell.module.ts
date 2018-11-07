import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShellRoutingModule } from './shell-routing.module';
import { ShellComponent } from './shell/shell.component';
import { ToolbarModule, ButtonModule, SplitButtonModule, MenubarModule, MenuModule} from 'primeng/primeng';


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
