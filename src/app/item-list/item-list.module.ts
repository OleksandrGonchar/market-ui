import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ItemLIstComponent } from './item-list.component';


@NgModule({
  declarations: [
    ItemLIstComponent
  ],
  imports: [
    BrowserModule,
    RouterModule
  ],
  exports: [ItemLIstComponent],
  providers: [
    RouterModule
  ],
  bootstrap: []
})
export class ItemListModule { }
