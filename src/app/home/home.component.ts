import { CoreService } from './../core/core.service';
import { StudentData } from './../core/main.models';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar} from '@angular/material';
import { MainService } from './../frontend/choose/main/main.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

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
              public authService: AuthService,
              public afAuth: AngularFireAuth,
              public httpClient: HttpClient,
              private router: Router) { }
  isNext = false;
  currentTabIndex = 0;
  hideForSignIn = true;
  hideForSignUp = true;
  id: string;
  name: string;
  department: string;
  grade: string;
  signInForm: FormGroup;
  signUpForm: FormGroup;

  ngOnInit() {
    this.mainService.getCollegeData();
    this.coreService.getAllStudentData();
    this.signInForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
    this.signUpForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email, this.checkEmailValidator.bind(this)]),
      password: new FormControl('', [Validators.required]),
      id: new FormControl('', [Validators.required, Validators.pattern('^[A-Z][0-9]{8}$'), this.checkStudentIDValidator.bind(this)]),
      name: new FormControl('', [Validators.required, Validators.pattern('^[\u4e00-\u9fa5a-zA-Z]+$')]),
      department: new FormControl('', [Validators.required]),
      grade: new FormControl('', [Validators.required])
    });
  }

  onSignInSubmit() {
    const email = this.signInForm.value.email;
    const password = this.signInForm.value.password;
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.openSnackBar('登入成功', 3000);
        this.authService.getUserInfo(this.afAuth.auth.currentUser.email);
        this.authService.authSubject.next();
        this.signInForm.reset();
        if (this.afAuth.auth.currentUser.displayName === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/users']);
        }
      })
      .catch(err => {
        console.log(err);
        if (err.code === 'auth/invalid-email') {
          this.openSnackBar('請輸入正確email格式', 3000);
        } else if (err.code === 'auth/wrong-password') {
          this.openSnackBar('密碼錯誤', 3000);
        } else if (err.code === 'auth/user-not-found') {
          this.openSnackBar('無此使用者', 3000);
        }
      });
  }

  onNextStep() {
    this.isNext = !this.isNext;
    this.mainService.getCollegeList();
  }

  onSignUpSubmit() {
    const sendObject = {};
    sendObject['account'] = this.signUpForm.value.email;
    sendObject['password'] = this.signUpForm.value.password;
    sendObject['studentName'] = this.signUpForm.value.name;
    sendObject['studentID'] = this.signUpForm.value.id;
    sendObject['classLevel'] = this.signUpForm.value.department + this.signUpForm.value.grade;
    this.afAuth.auth.createUserWithEmailAndPassword(sendObject['account'], sendObject['password']).catch(err => console.log(err));
    this.httpClient.post('https://garycourse.herokuapp.com/api/student/', sendObject)
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      );
    this.openSnackBar();
    this.isNext = false;
    this.signUpForm.reset();
    this.signUpForm.disable();
    setTimeout(() => this.signUpForm.enable(), 1000);
  }

  checkStudentIDValidator(control: FormControl) {
    this.coreService.getAllStudentData();
    const studentIDList = this.coreService.studentDataList.map(item => item = item.studentID);
    const isFind = studentIDList.find(item => item === control.value);
    if (isFind !== undefined) {
      return {'checkStudentID': true};
    } else {
      return null;
    }
  }

  checkEmailValidator(control: FormControl) {
    this.coreService.getAllStudentData();
    const emailList = this.coreService.studentDataList.map(item => item = item.account);
    const isFind = emailList.find(item => item === control.value);
    if (isFind !== undefined) {
      return {'checkEmail': true};
    } else {
      return null;
    }
  }

  openSnackBar(text = '註冊成功!', sec = 1000) {
    this.currentTabIndex = 0;
    this.snackBar.open(text, '收回', {
      duration: sec,
    });
  }
}
