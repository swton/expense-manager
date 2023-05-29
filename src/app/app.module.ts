import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { AlertComponent } from 'src/shared/alert/alert.component';
import { HeaderComponent } from 'src/shared/header/header.component';
import { RecordComponent } from './record/record.component';
import { HistoryComponent } from './history/history.component';
import { AboutComponent } from './about/about.component';
import { ReportComponent } from './report/report.component';
import { MaintabComponent } from '../shared/maintab/maintab.component';
import { EditRecordComponent } from './record/edit-record/edit-record.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthInterceptorService } from 'src/services/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    HomeComponent,
    AlertComponent,
    HeaderComponent,
    HomeComponent,
    RecordComponent,
    HistoryComponent,
    AboutComponent,
    ReportComponent,
    MaintabComponent,
    EditRecordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
