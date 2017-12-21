import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { LoginUser } from './../interfaces/login-user.interface';

@Injectable()
export class LoginService {
    private _host: string;
    private _databaseUrl: string;
    private _user: LoginUser;
    private _userVariableName: string = 'marketUiUser';

    constructor(private http: HttpClient) {
        this._host = environment.host;
        this._databaseUrl = environment.apiDatabase;
    };

    private _getUserLocalStorage(): LoginUser {
        return JSON.parse(localStorage.getItem(this._userVariableName));
    }

    private _getUser(): LoginUser {
        const user =  this._getUserLocalStorage();
        return user ? user : this._takeUser();
    }

    private _setUserLocalStorage(user: LoginUser): void {
        localStorage.setItem(this._userVariableName, JSON.stringify(user));
    }

    /**
     * ToDo rewrite, development lifehuck, dummy login for development
     */
    private _takeUser(): LoginUser {
        let userName: string = prompt('Vrite your user login').trim();
        let userLogin: string = prompt('Vrite your user password').trim();
        const user: LoginUser = {
            login: userName,
            passwoord: userLogin
        };
        this._setUserLocalStorage(user);

        return user;
    }

    public getUser(): LoginUser {
        return this._user ? {...this._user} : this._getUser();
    }
};