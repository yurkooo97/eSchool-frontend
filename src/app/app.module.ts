import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { TokenInterceptorService } from './services/token-interceptor.service';
import { AdmingroupsService } from './services/admingroups.service';
import { AdminSubjectsService } from './services/admin-subjects.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule 
  ],
	providers: [AdmingroupsService, 
		AdminSubjectsService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptorService,
			multi: true
		}
	],
  bootstrap: [AppComponent]
})
export class AppModule { }
