import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { ItemListModule } from './item-list/item-list.module';
import { ItemFormModule } from './item-form/item-form.module';
import { LoginModule } from './login/login.module';

import { ItemListService } from './services/item-list.service';

import { AppComponent } from './app.component';
import { ItemLIstComponent } from './item-list/item-list.component';
import { ItemFormComponent } from './item-form/item-form.component';

const appRoutes: Routes = [
  { path: 'edit', component: ItemFormComponent },
  { path: 'edit/:id', component: ItemFormComponent },
  { path: '**', component: ItemLIstComponent },
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    HttpClientModule,
    ItemListModule,
    ItemFormModule,
    LoginModule
  ],
  providers: [
    ItemListService,
    ItemListModule,
    ItemFormModule,
    HttpClientModule,
    RouterModule,
    LoginModule
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }
