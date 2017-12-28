import { Router } from '@angular/router';
import { CoreService } from './../core/core.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService,
              public afAuth: AngularFireAuth,
              public coreService: CoreService,
              private router: Router) { }
  user = {};
  isLogin = false;
  ngOnInit() {
    this.authService.authSubject
      .subscribe(() => {
        this.authService.getUserInfo(this.afAuth.auth.currentUser.email);
        this.user = this.authService.userInfo['studentName'];
        this.isLogin = this.authService.isLogin;
      });
  }

  logout() {
    this.authService.logout();
    this.isLogin = this.authService.isLogin;
    this.router.navigate(['/']);
  }

}
