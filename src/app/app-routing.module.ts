import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { HomeComponent } from './home/home.component';
import { RecordComponent } from './record/record.component';
import { HistoryComponent } from './history/history.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {
    path: '',
    component: AuthenticationComponent
  },
  {path:'home',component : HomeComponent},
  {path:'record',component : RecordComponent},
  {path:'history',component : HistoryComponent},
  {path:'about',component : AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
