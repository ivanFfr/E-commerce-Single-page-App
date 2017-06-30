import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/auth.service'

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  user = null;
  constructor(private auth: AuthService) {
  }

  isAuthenticated() {
    this.user = this.auth.authState;
    if (this.user == null) {
      return false;
    } else {
      return true;
    }
  }

  logOut() {
    this.auth.signOut()
    this.isAuthenticated()
  }

  ngOnInit() {
  }

}
