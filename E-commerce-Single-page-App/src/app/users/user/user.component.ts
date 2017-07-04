import { Component, OnInit } from '@angular/core';
import { Item } from '../../shared/model/item'
import { ItemsService } from 'app/shared/model/items-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userUrl;
  authState: any = null;

  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {
    activatedRoute.url.subscribe((url) => this.userUrl = url[0].path);
  }


  ngOnInit() {

    

    console.log(this.authState);

  }
}
