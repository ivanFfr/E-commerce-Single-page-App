import { Injectable } from '@angular/core';

import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/Rx';
import { Item } from './item';

@Injectable()
export class ItemsService {

  items: FirebaseListObservable<any>;
  myItems: Array<Item> = [];
  myItem: any;

  constructor(private db: AngularFireDatabase, private router: Router) {

  }

  getAllItems(): any {
    return this.db.list('/items')

      .flatMap(list => list)

      .map((item) => (item))

  }

  updateItemData(gender: string, brand: string, size: string, name: string, description: string,
    imgUrl: string, price: string, itemUrl: string): void {

    const path = `items`;
    const item: Item = {
      gender: gender,
      brand: brand,
      size: size,
      name: name,
      description: description,
      imgUrl: imgUrl,
      price: price,
      itemUrl: itemUrl,
      marked: false,
    }

    this.db.list(path).push(item)
    this.router.navigate(['']);
  }
}
