import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import { AuthService } from 'app/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  ngForm: FormGroup;
  user: any;
  alertMsg = '';
  email = '';
  password = '';
  firstName = '';
  lastName = '';
  phone = '';
  address = '';

  constructor(private Auth: AuthService, private fb: FormBuilder) {
    this.ngForm = fb.group({
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      'firstName': [null, Validators.compose([Validators.required])],
      'lastName': [null, Validators.compose([Validators.required])],
      'phone': [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      'address': [null, Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {

  }

  register(user) {
    this.Auth.emailSignUp(user.firstName, user.lastName, user.email, user.phone, user.password, user.address)
      .then(error => {
        if (error !== undefined) {
          if (error.code === 'auth/email-already-in-use') {
            this.alertMsg = 'Email already exists!'
          } else if (error.code === 'auth/invalid-email') {
            this.alertMsg = 'Invalid email address!'
          } else if (error.code === 'auth/weak-password') {
            this.alertMsg = 'Weak password!'
          }
        }
      })
  }
}
