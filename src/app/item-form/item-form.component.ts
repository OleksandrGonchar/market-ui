import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms'

import { Item } from './../interfaces/item.interface';
import { PriceArrayItem } from './price-array.util';
import { ItemListService } from './../services/item-list.service';
import { ItemFormService } from './item-form.service';
import { store } from './../store/store';

const marketTypes = {
  csgo: 'csgo',
  pubg: 'pubg',
  dota: 'dota2'
};

@Component({
  selector: 'item-form',
  templateUrl: './item-form.component.html',
  styles: []
})
export class ItemFormComponent {
  private _sub: any;
  private _dbId: string = '';

  public itemForm: FormGroup;
  public id: number;
  public showByUrl: boolean = true;
  public item;
  public marketTypes = [];

  constructor(
    private route: ActivatedRoute,
    private itemListService: ItemListService,
    private itemFormService: ItemFormService
  ) {};

  public save(): void {
    console.log(this.itemForm.value);
    this._updateCount();
    this.itemFormService.save(this.itemForm.value, this._dbId);
  };

  public deletePrice(index: number): void {
    const control: FormArray = this.itemForm.get('prices') as FormArray;
    control.removeAt(index);
  };

  public setAutoPrice(arrayOfPrices) {
      console.log(arrayOfPrices);
  }

  /**
   * Return true, if some input in prices has value smaller or equal to 0
   */
  private _validatePriceArray(): boolean {
    const prices = (this.itemForm.get('prices') as FormArray);

    for (let i = 0; i < prices.controls.length; i++) {
      const price: boolean = +prices.get(`${i}`).get('price').value <= 0;
      const count: boolean = +prices.get(`${i}`).get('count').value <= 0;
      if (price || count) {
        return true;
      };
    };

    return false;
  };

  private _addBuyCount(count: number): void {
    const buyCount: FormControl = this.itemForm.get('count') as FormControl;

    if (buyCount.value < count) {
      buyCount.setValue(count);
    }
  }

  private _updateCount(): void {
    const prices: FormArray = (this.itemForm.get('prices') as FormArray);
    let count: number = 0
    
    for (let i = 0; i < prices.controls.length; i++) {
      count += +prices.get(`${i}`).get('count').value;
    };

    this._addBuyCount(count);
  }
  
  public addPrice() {
    const control: FormArray = this.itemForm.get('prices') as FormArray;
    if (this._validatePriceArray()) {
      return;
    }
    control.push(PriceArrayItem());
    this._updateCount();
  }

  public changeActive() {
    this.showByUrl = !this.showByUrl;
  }

  private _checkFulfilledData(item): boolean {
    return !!item && !!item.data;
  }

  private _createForm(): void {
    const itemIsPresent: boolean = this._checkFulfilledData(this.item);
    const marketType: string = (itemIsPresent&&this.item.data.marketType) ? this.item.data.marketType : marketTypes.csgo;
    const currentPrice: number = itemIsPresent ? this.item.data.priceBuy : 0;
    const currentCount: number = itemIsPresent ? this.item.data.count : 0;
    const id: string = itemIsPresent ? this.item.data.id : '';
    const group: string = itemIsPresent ? this.item.data.group : '';
    const pause: boolean = itemIsPresent ? !!this.item.data.pause : false;
    const prices = new FormArray([]);

    if (itemIsPresent) {
      this._dbId = this.item._id;
      this.item.data.prices
        .sort((a, b): number => a.price - b.price)
        .map((item): void => {
          prices.push(PriceArrayItem(item.price, item.count));
        });
    };

    this.itemForm = new FormGroup({
      marketType: new FormControl(marketType),
      priceBuy: new FormControl(currentPrice),
      count: new FormControl(currentCount),
      id: new FormControl(id),
      group: new FormControl(group),
      pause: new FormControl(pause),
      prices: prices
    });
  };

  public newConfigFromUrl(obj) {
    const idInput = this.itemForm.get('id');
    const groupInput = this.itemForm.get('group');

    idInput.setValue(obj.id);
    groupInput.setValue(obj.group);
  }

  private _updateItem(): void {
    this.item = store.getState().collections
      .find(item => item._id === this.id);

    this._createForm();
  };

  private _fillButtonArray() {
    for (let item in marketTypes) {
      this.marketTypes.push(item);
    }
  }

  public changemarketTypeButton(type: string): void {
    console.log(type);
    this.itemForm.get('marketType').setValue(type);
  }

  ngOnInit() {
    this._sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this._fillButtonArray();

    if (!this.item) {
      this.itemListService.getListOfElements();
      this._createForm();
    } else {
      this._updateItem();
    };

    store.subscribe((): void => {
      this._updateItem();
    });
  };

  ngOnDestroy() {
    this._sub.unsubscribe();
  };
}
