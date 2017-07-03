import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import { ItemsService } from 'app/shared/model/items-service.service'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  ngForm: FormGroup;
  item: any;
  alertMsg = 'This Field is Required!';
  gender = '';
  brand = '';
  size = '';
  name = '';
  description = '';
  imgUrl = '';
  price = '';
  itemUrl = '';

  constructor(private itemsService: ItemsService, private fb: FormBuilder) {
    this.ngForm = fb.group({
      'gender': [null, Validators.compose([Validators.required])],
      'brand': [null, Validators.compose([Validators.required])],
      'size': [null, Validators.compose([Validators.required])],
      'name': [null, Validators.compose([Validators.required])],
      'description': [null, Validators.compose([Validators.required])],
      'imgUrl': [null, Validators.compose([Validators.required])],
      'price': [null, Validators.compose([Validators.required])],
      'itemUrl': [null, Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
  }

  addItem(item) {

    this.gender = item.gender;
    this.brand = item.brand;
    this.size = item.size;
    this.name = item.name;
    this.description = item.description;
    this.imgUrl = item.imgUrl;
    this.price = item.price;
    this.itemUrl = item.itemUrl;

    this.itemsService.updateItemData(this.gender, this.brand, this.size, name, this.description, this.imgUrl, this.price, this.itemUrl)
  }

}
