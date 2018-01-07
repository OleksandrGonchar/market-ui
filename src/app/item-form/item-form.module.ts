import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ItemFormService } from './item-form.service';

import { ItemFormComponent } from './item-form.component';
import { UrlParserComponent } from './url-parser/url-parser.component';
import { AutoPricer } from './auto-pricer/auto-pricer.component';


@NgModule({
  declarations: [
    ItemFormComponent,
    UrlParserComponent,
    AutoPricer
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
