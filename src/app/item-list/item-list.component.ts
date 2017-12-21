import { Component } from '@angular/core';
import { Item } from './../interfaces/item.interface';
import { actions } from './../store/action';
import { store } from './../store/store';

import { ItemListService } from './../services/item-list.service';

@Component({
  selector: 'item-list',
  templateUrl: './item-list.component.html',
  styles: []
})
export class ItemLIstComponent {
  public itemLIst: Array<Item>;

  private _storeSubscription;
  
  constructor(private geItems: ItemListService) {}

  ngOnInit() {
    this.geItems.getListOfElements()
    this._storeSubscription = store.subscribe(() => {
      this.itemLIst = store.getState().collections
    });
  }

  ngOnDestroy() {
    
  }
}
