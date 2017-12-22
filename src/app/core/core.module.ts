import { NgModule } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { HomeComponent } from './../home/home.component';
import { AppRoutingModule } from '../app-routing.module';
import { CollegeService } from '../frontend/choose/college.service';
import { MainService } from '../frontend/choose/main/main.service';
import { CoreService } from './core.service';
import { FrameworkModule } from './framework.module';
import { BackendService } from '../backend/share/backend.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CommonModule,
    FrameworkModule
  ],
  exports: [
    AppRoutingModule,
    HeaderComponent,
    HomeComponent
  ],
  providers: [
    CollegeService,
    MainService,
    CoreService,
    BackendService
  ],
})
export class CoreModule {}
