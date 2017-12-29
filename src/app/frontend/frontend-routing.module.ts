import { MainComponent } from './choose/main/main.component';
import { ChooseComponent } from './choose/choose.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrontendComponent } from './frontend.component';
import { UnenrollComponent } from './choose/unenroll/unenroll.component';
import { CourseListComponent } from './choose/course-list/course-list.component';
import { CourseTableComponent } from './choose/course-table/course-table.component';
import { AuthGuard } from '../auth/auth-guard.service';


const frontEndRoutes: Routes = [
  { path: '', component: FrontendComponent, children: [
    { path: '', component: ChooseComponent, children: [
      {path: '', redirectTo: '/users/select', pathMatch: 'full'},
      {path: 'select', component: MainComponent, canActivate: [AuthGuard]},
      {path: 'unenroll', component: UnenrollComponent, canActivate: [AuthGuard]},
      {path: 'courseList', component: CourseListComponent, canActivate: [AuthGuard]},
      {path: 'courseTable', component: CourseTableComponent, canActivate: [AuthGuard]},
    ]}
  ]},
];

@NgModule({
  imports: [
    RouterModule.forChild(frontEndRoutes)
  ],
  exports: [RouterModule],
  providers: []
})
export class FrontEndRoutingModule {}
