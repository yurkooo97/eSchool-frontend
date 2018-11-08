import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TabMenuModule} from 'primeng/tabmenu';
import {InputTextModule} from 'primeng/inputtext';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {ToolbarModule} from 'primeng/toolbar';
import { FormsModule } from '@angular/forms';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
		LoginRoutingModule,
		TabMenuModule,
    InputTextModule,
    CardModule,
    ButtonModule,
		ToolbarModule,
		FormsModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
