import { Component, OnInit } from '@angular/core';
import { Item } from '../../shared/model/item'
import { ItemsService } from 'app/shared/model/items-service.service';

@Component({
  selector: 'app-women',
  templateUrl: './women.component.html',
  styleUrls: ['./women.component.css']
})
export class WomenComponent implements OnInit {
  allItems: Array<Item> = [];
  filtered: Array<Item> = [];

  constructor(private itemsService: ItemsService) {
  }

  ngOnInit() {
    this.allItems = [];
    this.filtered = [];
    this.itemsService.getAllItems()
      .subscribe(item => {
        this.allItems.push(item);
        this.filtered = this.allItems.filter(by => by.gender.includes('Women'));
        this.allItems = this.filtered;
      });
  }

  search(search: string) {
    this.filtered = this.allItems.filter(item =>
      item.description.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
  }

}
