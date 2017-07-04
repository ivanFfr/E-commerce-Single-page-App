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
  myItem: any;
  constructor(private itemsService: ItemsService, private router: Router, private activatedRoute: ActivatedRoute) {
    activatedRoute.url.subscribe((url) => this.itemUrl = url[0].path);
  }

  ngOnInit() {
    this.itemsService.getAllItems()
      .subscribe(item => {
        if (item.itemUrl === this.itemUrl) {
          this.myItem = item;
        }
      });
  }

}
