import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms'

import { Item } from './../interfaces/item.interface';
import { PriceArrayItem } from './price-array.util';
import { ItemListService } from './../services/item-list.service';
import { ItemFormService } from './item-form.service';
import { store } from './../store/store';

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
  public item;

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

  private _createForm(): void {
    const currentPrice: number = (!!this.item && !!this.item.data) ? this.item.data.priceBuy : 0;
    const currentCount: number = (!!this.item && !!this.item.data) ? this.item.data.count : 0;
    const id: string = (!!this.item && !!this.item.data) ? this.item.data.id : '';
    const group: string = (!!this.item && !!this.item.data) ? this.item.data.group : '';
    const pause: boolean = (!!this.item && !!this.item.data) ? !!this.item.data.pause : false;
    const prices = new FormArray([]);

    if (!!this.item && !!this.item.data) {
      this._dbId = this.item._id;
      this.item.data.prices
        .sort((a, b): number => a.price - b.price)
        .map((item): void => {
          prices.push(PriceArrayItem(item.price, item.count));
        });
    };

    this.itemForm = new FormGroup({
      priceBuy: new FormControl(currentPrice),
      count: new FormControl(currentCount),
      id: new FormControl(id),
      group: new FormControl(group),
      pause: new FormControl(pause),
      prices: prices
    });
  };

  private _updateItem(): void {
    this.item = store.getState().collections
      .filter(item => item._id === this.id)[0];

    this._createForm();
  };

  ngOnInit() {
    this._sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

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
