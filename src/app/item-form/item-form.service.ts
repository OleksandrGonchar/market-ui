import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { LoginUser } from './../interfaces/login-user.interface';
import { LoginService } from './../login/login.service';

interface DataForServer {
    user: string;
    key: string;
    data: any;
    _id?: any;
}

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

    save(data, id?: string) {
        const user: LoginUser = this._login.getUser();
        const sndedData: DataForServer = {
            'user': user.login,
            'key': user.passwoord,
            'data': { ...data }
        };
        /*id ? */sndedData._id = {
            $oid: '5a4768ce5757cb0012debc8a'
        }//: null;
        console.log('sndedData', sndedData);
        const request = this.http.post(this._host + this._databaseUrl,
            sndedData
            , {}
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