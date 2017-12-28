import { CoreService } from './../../../core/core.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-side-info',
  templateUrl: './side-info.component.html',
  styleUrls: ['./side-info.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SideInfoComponent implements OnInit {

  constructor(private authService: AuthService,
              private afAuth: AngularFireAuth) { }
  user = {};
  ngOnInit() {
    this.authService.getUserInfo(this.afAuth.auth.currentUser.email);
    this.user = this.authService.userInfo;
  }

}
