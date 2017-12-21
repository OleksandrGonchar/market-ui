import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { LoginService } from './login.service';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule
  ],
  exports: [],
  providers: [LoginService],
  bootstrap: []
})
export class LoginModule { }
