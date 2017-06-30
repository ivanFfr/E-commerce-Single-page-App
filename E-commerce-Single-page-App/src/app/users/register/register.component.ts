import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  constructor(private Auth: AuthService) {
  }

  ngOnInit() {

  }

  register(firstName: string, lastName: string, email: string, phone: string, password: string, address: string) {
    this.Auth.emailSignUp(firstName, lastName, email, phone, password, address)
  }
}
