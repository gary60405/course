import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

import { FrameworkModule } from './core/framework.module';
import { BackEndModule } from './backend/backend.module';
import { FrontEndModule } from './frontend/front-end.module';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';

export const firebaseConfig = {
  apiKey: 'AIzaSyDJtl3PPF-5JAYMoXa41tGy0FdOphtu9Ps',
  authDomain: 'course-8199c.firebaseapp.com',
  databaseURL: 'https://course-8199c.firebaseio.com',
  projectId: 'course-8199c',
  storageBucket: 'course-8199c.appspot.com',
  messagingSenderId: '601879565511'
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FrontEndModule,
    FrameworkModule,
    BackEndModule,
    CoreModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
