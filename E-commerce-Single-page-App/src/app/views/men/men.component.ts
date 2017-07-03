import { Component, OnInit } from '@angular/core';
import { Item } from '../../shared/model/item'
import { ItemsService } from 'app/shared/model/items-service.service';

@Component({
  selector: 'app-men',
  templateUrl: './men.component.html',
  styleUrls: ['./men.component.css']
})
export class MenComponent implements OnInit {
  allItems: Array<Item> = [];
  filtered: Array<Item> = [];
  constructor(private itemsService: ItemsService) {
  }

  ngOnInit() {
    this.allItems = [];
    this.filtered = [];
    this.itemsService.returnAllItems
      .then(items => {
        this.allItems = this.filtered = items.filter(item => item.gender.includes('Men'))
      });

  }
  search(search: string) {
    this.filtered = this.allItems.filter(item => item.description.includes(search))
  }

  nextPage() {

  }
  prevPage() {

  }

}
