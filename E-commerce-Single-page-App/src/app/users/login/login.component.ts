import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import { AuthService } from 'app/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  ngForm: FormGroup;
  user: any;
  alertMsg = 'This Field is Required!';
  email = '';
  password = '';

  constructor(private Auth: AuthService, private fb: FormBuilder) {
    this.ngForm = fb.group({
      'email': [null, Validators.compose([Validators.required])],
      'password': [null, Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {

  }

  login(user) {
    this.Auth.emailLogin(user.email, user.password)
  }
}
