import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ItemLIstComponent } from './item-list.component';
import {
  MatCardModule
} from '@angular/material';


@NgModule({
  declarations: [
    ItemLIstComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    MatCardModule
  ],
  exports: [ItemLIstComponent],
  providers: [
    RouterModule
  ],
  bootstrap: []
})
export class ItemListModule { }
