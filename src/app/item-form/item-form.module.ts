import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ItemFormService } from './item-form.service';

import { ItemFormComponent } from './item-form.component';


@NgModule({
  declarations: [
    ItemFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  exports: [ItemFormComponent],
  providers: [ItemFormService],
  bootstrap: []
})
export class ItemFormModule { }
