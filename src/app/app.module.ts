import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AdmingroupsService } from './services/admingroups.service';
import { TokenInterceptorService } from './services/token-interceptor.service';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

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
	{
		provide: HTTP_INTERCEPTORS,
		useClass: TokenInterceptorService,
		multi: true
	}],
  bootstrap: [AppComponent]
})
export class AppModule { }
