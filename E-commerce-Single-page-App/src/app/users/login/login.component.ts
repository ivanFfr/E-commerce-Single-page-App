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
  alertMsg = '';
  email = '';
  password = '';

  constructor(private Auth: AuthService, private fb: FormBuilder) {
    this.ngForm = fb.group({
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])],
    });
  }

  ngOnInit() {

  }

  login(user) {
    this.Auth.emailLogin(user.email, user.password)
      .then(error => {
        if (error !== undefined) {
          if (error.code === 'auth/wrong-password') {
            this.alertMsg = 'Wrong password!'
          } else if (error.code === 'auth/user-not-found') {
            this.alertMsg = 'User not found!'
          }
        }

        // if (error !== undefined) {
        //   if (error.code === 'auth/email-already-in-use') {
        //     this.alertMsg = 'Email already exists!'
        //   } else if (error.code === 'auth/invalid-email') {
        //     this.alertMsg = 'Invalid email address!'
        //   } else if (error.code === 'auth/weak-password') {
        //     this.alertMsg = 'Weak password!'
        //   }
        // }
      })
  }
}
