import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { actions } from './../store/action';
import { store } from './../store/store';

import { LoginService } from './../login/login.service';
import { LoginUser } from '../interfaces/login-user.interface';

@Injectable()
export class ItemListService {
    private _host: string;
    private _databaseUrl: string;

    constructor(
        private http: HttpClient,
        private _loginService: LoginService
    ) {
        this._host = environment.host;
        this._databaseUrl = environment.apiDatabase;
    };

    getListOfElements() {
        const user: LoginUser = this._loginService.getUser();
        const request = this.http.post(this._host + this._databaseUrl,
            {
                user: user.login,
                key: user.passwoord
            }, {}
        ).subscribe(data => {
            store.dispatch({
              type: actions.updateCollection,
              collections: data
            });
            request.unsubscribe();
        }, err => {
          console.error(err);
          request.unsubscribe();
        });
    };
};