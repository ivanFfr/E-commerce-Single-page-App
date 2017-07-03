import { Component, OnInit } from '@angular/core';
import { Item } from '../../shared/model/item'
import { ItemsService } from 'app/shared/model/items-service.service';
import { AuthService } from 'app/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allItems: Array<Item> = [];
  constructor(private itemsService: ItemsService, private auth: AuthService) {
  }

  ngOnInit() {
    this.allItems = []
    this.itemsService.returnAllItems
      .then(items => {
        this.allItems = items
      });

  }

}

