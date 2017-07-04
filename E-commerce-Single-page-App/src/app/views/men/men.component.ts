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
    this.itemsService.getAllItems()
      .subscribe(item => {
        this.allItems.push(item);
        this.filtered = this.allItems.filter(by => by.gender.includes('Men'));
        this.allItems = this.filtered;
      });
  }
  search(search: string) {
    this.filtered = this.allItems.filter(item => item.description.includes(search));

  }

}
