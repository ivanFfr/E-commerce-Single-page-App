import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/auth.service'

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  user = null;
  userDisplayUrl;

  constructor(private auth: AuthService) {

  }

  isAuthenticated() {
    return this.auth.authenticated
  }
  isAdmin() {
    return true
    // return this.auth.isAdmin
  }

  logOut() {
    this.auth.signOut()
    this.isAuthenticated()
  }

  ngOnInit() {
    this.user = this.auth.authState;

  }

}
