import { FrameworkModule } from './../core/framework.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FrontendComponent } from './../frontend/frontend.component';
import { ChooseComponent } from './../frontend/choose/choose.component';
import { SideInfoComponent } from './../frontend/choose/side-info/side-info.component';
import { MainComponent, DialogDataComponent } from './../frontend/choose/main/main.component';
import { UnenrollComponent } from './../frontend/choose/unenroll/unenroll.component';
import { CourseListComponent } from './../frontend/choose/course-list/course-list.component';
import { CourseTableComponent } from './../frontend/choose/course-table/course-table.component';
import { FrontEndRoutingModule } from './frontend-routing.module';

@NgModule({
  declarations: [
    FrontendComponent,
    ChooseComponent,
    SideInfoComponent,
    MainComponent,
    UnenrollComponent,
    CourseListComponent,
    CourseTableComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FrontEndRoutingModule,
    CommonModule,
    FrameworkModule,
  ]
})
export class FrontEndModule {}
