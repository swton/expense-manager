import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RecordComponent } from './record/record.component';
import { HistoryComponent } from './history/history.component';
import { AboutComponent } from './about/about.component';
import { ReportComponent } from './report/report.component';
import { MaintabComponent } from './maintab/maintab.component';
import { RouterModule, Routes } from '@angular/router';


const appRoutes : Routes = [
  {path:'',component : HomeComponent},
  {path:'home',component : HomeComponent},
  {path:'record',component : RecordComponent},
  {path:'history',component : HistoryComponent},
  {path:'about',component : AboutComponent}
];
import { AuthenticationComponent } from './authentication/authentication.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from 'src/shared/alert/alert.component';
import { HeaderComponent } from 'src/shared/header/header.component';

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
    MaintabComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
