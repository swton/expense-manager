import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { HomeComponent } from './home/home.component';
import { RecordComponent } from './record/record.component';
import { EditRecordComponent } from './record/edit-record/edit-record.component';
import { AboutComponent } from './about/about.component';
import { HistoryComponent } from './history/history.component';
import { ReportComponent } from './report/report.component';
import { AuthGuard } from 'src/guard/auth.guard';

const routes: Routes = [
  {path: '', component: AuthenticationComponent},
  {path:'home',component : HomeComponent, canActivate: [AuthGuard]},
  {path:'record',component : RecordComponent, canActivate: [AuthGuard]},
  {path:'record/add',component : EditRecordComponent, canActivate: [AuthGuard]},
  {path:'history',component : HistoryComponent, canActivate: [AuthGuard]},
  {path:'report',component : ReportComponent, canActivate: [AuthGuard]},
  {path:'about',component : AboutComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
