import { BackEndRoutingModule } from './backend-routing.module';
import { FrameworkModule } from './../core/framework.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BackendComponent } from './../backend/backend.component';
import { ApprovalComponent } from './../backend/approval/approval.component';
import { AddCourseComponent } from './../backend/add-course/add-course.component';
import { EditCourseComponent } from './../backend/edit-course/edit-course.component';
import { AdminPanelComponent } from './../backend/admin-panel/admin-panel.component';



@NgModule({
  declarations: [
    AddCourseComponent,
    BackendComponent,
    ApprovalComponent,
    EditCourseComponent,
    AdminPanelComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BackEndRoutingModule,
    CommonModule,
    FrameworkModule,
  ]
})
export class BackEndModule {}
