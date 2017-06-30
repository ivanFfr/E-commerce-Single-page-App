import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private Auth: AuthService) {

  }

  ngOnInit() {

  }

  login(email, password) {
    this.Auth.emailLogin(email, password)
  }
}
