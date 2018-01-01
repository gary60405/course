import { AuthGuard } from './../auth/auth-guard.service';
import { TeacherInfoComponent } from './teacher-info/teacher-info.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { BackendComponent } from './backend.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApprovalComponent } from './approval/approval.component';
import { EditCourseComponent } from './edit-course/edit-course.component';




const frontEndRoutes: Routes = [
  { path: '', component: BackendComponent, children: [
    { path: '', redirectTo: 'addCourse', pathMatch: 'full'},
    { path: 'addCourse', component: AddCourseComponent, canActivate: [AuthGuard]},
    { path: 'approval', component: ApprovalComponent, canActivate: [AuthGuard]},
    { path: 'editCourse', component: EditCourseComponent, canActivate: [AuthGuard]},
    { path: 'teacherInfo', component: TeacherInfoComponent, canActivate: [AuthGuard]}
  ]},
];

@NgModule({
  imports: [
    RouterModule.forChild(frontEndRoutes)
  ],
  exports: [RouterModule],
  providers: []
})
export class BackEndRoutingModule {}
