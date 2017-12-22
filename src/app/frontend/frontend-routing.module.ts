import { MainComponent } from './choose/main/main.component';
import { ChooseComponent } from './choose/choose.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrontendComponent } from './frontend.component';
import { UnenrollComponent } from './choose/unenroll/unenroll.component';
import { CourseListComponent } from './choose/course-list/course-list.component';
import { CourseTableComponent } from './choose/course-table/course-table.component';


const frontEndRoutes: Routes = [
  { path: '', component: FrontendComponent, children: [
    { path: '', component: ChooseComponent, children: [
      {path: '', redirectTo: '/users/select', pathMatch: 'full'},
      {path: 'select', component: MainComponent},
      {path: 'unenroll', component: UnenrollComponent},
      {path: 'courseList', component: CourseListComponent},
      {path: 'courseTable', component: CourseTableComponent},
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
