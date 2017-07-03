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
  alertMsg = 'This Field is Required!';
  email = '';
  password = '';
  firstName = '';
  lastName = '';
  phone = '';
  address = '';

  constructor(private Auth: AuthService, private fb: FormBuilder) {
    this.ngForm = fb.group({
      'email': [null, Validators.compose([Validators.required])],
      'password': [null, Validators.compose([Validators.required])],
      'firstName': [null, Validators.compose([Validators.required])],
      'lastName': [null, Validators.compose([Validators.required])],
      'phone': [null, Validators.compose([Validators.required])],
      'address': [null, Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {

  }

  register(user) {
    this.Auth.emailSignUp(user.firstName, user.lastName, user.email, user.phone, user.password, user.address)
  }
}
