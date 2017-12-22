import { CoreService } from './../core/core.service';
import { StudentData } from './../core/main.models';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar} from '@angular/material';
import { MainService } from './../frontend/choose/main/main.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  constructor(public snackBar: MatSnackBar,
              public mainService: MainService,
              public coreService: CoreService,
              public afAuth: AngularFireAuth,
              public httpClient: HttpClient) { }
  isNext = false;
  currentTabIndex = 0;
  hideForSignIn = true;
  hideForSignUp = true;
  id: string;
  name: string;
  department: string;
  grade: string;

  signInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email], this.checkEmailValidator.bind(this)),
    password: new FormControl('', [Validators.required]),
    id: new FormControl('', [Validators.required, Validators.pattern('^[A-Z][0-9]{8}$')], this.checkStudentIDValidator.bind(this)),
    name: new FormControl('', [Validators.required, Validators.pattern('^[\u4e00-\u9fa5a-zA-Z]+$')]),
    department: new FormControl('', [Validators.required]),
    grade: new FormControl('', [Validators.required])
  });

  ngOnInit() {
    this.mainService.getCollegeList();
    this.coreService.getStudentData();
  }

  onSignInSubmit() {
    this.signInForm.reset();
    this.signInForm.disable();
    setTimeout(() => this.signInForm.enable(), 1000);
  }

  onNextStep() {
    this.isNext = !this.isNext;
    this.mainService.getCollegeList();
  }

  onSignUpSubmit() {
    const formValue = this.signUpForm.value;
    const email = formValue.email;
    const password = formValue.password;
    // this.afAuth.auth.createUserWithEmailAndPassword(email, password).catch(err => console.log(err));
    this.openSnackBar();
    this.isNext = false;
    this.signUpForm.reset();
    this.signUpForm.disable();
    setTimeout(() => this.signUpForm.enable(), 1000);
  }

  checkStudentIDValidator(control: FormControl) {
    const formValue = this.signUpForm.value;
    this.coreService.getStudentData();
    const isFind = this.coreService.studentDataList.find(item => item.studentID === formValue.id);
    if (isFind !== undefined) {
      return {'checkStudentID': true};
    } else {
      return null;
    }
  }

  checkEmailValidator(control: FormControl) {
    this.coreService.getStudentData();
    const formValue = this.signUpForm.value;
    const isFind = this.coreService.studentDataList.find(item => item.account === formValue.email);
    console.log(isFind);
    if (isFind !== undefined) {
      return {'checkEmail': true};
    }
    return null;
  }

  openSnackBar() {
    this.currentTabIndex = 0;
    this.snackBar.open('註冊成功!', '收回', {
      duration: 1000,
    });
  }
}
