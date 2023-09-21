import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MyInterceptor } from './my-interceptor.service'; 





import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IsoroboComponent } from './isorobo/isorobo.component';


@NgModule({
  declarations: [
    AppComponent,
    IsoroboComponent,
    

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule

    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyInterceptor,
      multi: true, // Set to true if you have multiple interceptors
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
