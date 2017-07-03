import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'app/shared/model/items-service.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private itemsService: ItemsService) {
  }

  ngOnInit() {
    this.itemsService.getAllItems()
  }

}
