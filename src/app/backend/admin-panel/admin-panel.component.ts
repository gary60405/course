import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminPanelComponent implements OnInit {

  constructor(private authService: AuthService,
              private afAuth: AngularFireAuth) { }
  user = {};
  ngOnInit() {
    this.authService.getUserInfo(this.afAuth.auth.currentUser.email);
    this.user = this.authService.userInfo;
  }

}
