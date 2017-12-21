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
    this.itemFormService.save(this.itemForm.value);
  };

  public deletePrice(index: number): void {
    const control: FormArray = this.itemForm.get('priceList') as FormArray;
    control.removeAt(index);
  };

  /**
   * Return true, if some input in pricelist has value smaller or equal to 0
   */
  private _validatePriceArray(): boolean {
    const priceList = (this.itemForm.get('priceList') as FormArray);

    for (let i = 0; i < priceList.controls.length; i++) {
      const price: boolean = +priceList.get(`${i}`).get('price').value <= 0;
      const count: boolean = +priceList.get(`${i}`).get('count').value <= 0;
      if (price || count) {
        return true;
      };
    };

    return false;
  };
  
  public addPrice() {
    const control: FormArray = this.itemForm.get('priceList') as FormArray;
    if (this._validatePriceArray()) {
      return;
    }
    control.push(PriceArrayItem());
  }

  private _createForm(): void {
    const currentPrice: number = (!!this.item && !!this.item.data) ? this.item.data.priceBuy : 0;
    const currentCount: number = (!!this.item && !!this.item.data) ? this.item.data.count : 0;
    const priceList = new FormArray([]);

    if (!!this.item && !!this.item.data) {
      this.item.data.prices.map((item): void => {
        priceList.push(PriceArrayItem(item.price, item.count));
      });
    };

    this.itemForm = new FormGroup({
      buyPrice: new FormControl(currentPrice),
      buyCount: new FormControl(currentCount),
      priceList: priceList
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
