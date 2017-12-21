import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { LoginUser } from './../interfaces/login-user.interface';
import { LoginService } from './../login/login.service';

@Injectable()
export class ItemFormService {
    private _host: string;
    private _databaseUrl: string;

    constructor(
        private http: HttpClient,
        private _login: LoginService
    ) {
        this._host = environment.host;
        this._databaseUrl = environment.apiDatabase;
    };

    save(data) {
        const user: LoginUser = this._login.getUser(); 
        const request = this.http.post(this._host + this._databaseUrl,
            {
                'user': user.login,
                'key': user.passwoord,
                'data': { data }
            }, {}
        ).subscribe(resp => {
            console.log({ data })
            console.log(resp);
            request.unsubscribe();
        }, err => {
          console.error(err);
          request.unsubscribe();
        });
    };
};