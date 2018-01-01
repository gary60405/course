import { CoreService } from './../core/core.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthService {
  public isLogin = false;
  public userInfo = {};
  public authSubject = new Subject;
  constructor(private coreService: CoreService,
              private afAuth: AngularFireAuth) { }

  getUserInfo(user: string) {
    this.coreService.getAllStudentData();
    this.coreService.studentDataList.forEach(row => {
      if (row.account === user) {
       this.userInfo = row;
       this.isLogin = true;
      }
    });
  }

  logout() {
    this.afAuth.auth.signOut();
    this.isLogin = false;
  }


}
