import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  authState: any = null

  constructor(private auth: AuthService) {
    this.authState = auth.authState
  }
  ok() {
    console.log(this.authState.firstName);

  }

  ngOnInit() {
  }

}
