import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminPanelComponent implements OnInit {

  constructor(private authService: AuthService,
              private afAuth: AngularFireAuth,
              private router: Router) { }
  user = {};
  ngOnInit() {
    this.authService.getUserInfo(this.afAuth.auth.currentUser.email);
    this.user = this.authService.userInfo;
  }

  onNavigate(url: string) {
    this.router.navigateByUrl(url);
  }

}
