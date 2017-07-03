import { Component, OnInit } from '@angular/core';
import { Item } from '../../shared/model/item'
import { ItemsService } from 'app/shared/model/items-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {
  itemUrl;
  myItem: Array<Item> = [];
  constructor(private itemsService: ItemsService, private router: Router, private activatedRoute: ActivatedRoute) {
    activatedRoute.url.subscribe((url) => this.itemUrl = url[0].path);
  }

  ngOnInit() {

    setTimeout(() => {
      this.itemsService.getItemByItemUrl(this.itemUrl)
      this.myItem = this.itemsService.myItem
      console.log(this.myItem);
    }, 1000);




    // this.myItem = this.itemsService.myItems.filter(item => item.itemUrl.includes(this.itemUrl))
    // console.log(this.myItem);
  }

}
