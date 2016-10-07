/**
 * Created by Lilith on 05/10/2016.
 */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { User } from '../picture/user';

@Injectable()
export class UsersList {

  static PROVIDERS = [
    UsersList
  ];


  constructor(private http: Http) {

  }

  checkUser(user: User): Promise<{userId:string, userToken:string}> {
    console.log('Sending user infos : ', user);

    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append("userId", user.userId);
    headers.append("userPwd", user.userPwd);

    let options = new RequestOptions({headers: headers});

    return this.http.get('/api/v1/users/', options)
      .toPromise()
      .then(this._checkStatus)
      .then(this._extractData)
      .catch(this._handleError);
  }

  private _checkStatus(res: Response) {
    console.log("_checkStatus ", res);
    if (res.status < 200 || res.status >= 300) {
      throw new Error('TODO');
    }
    return res;
  }

  private _extractData(res: Response) {
    console.log("_extractData ", res);
    let body = res.json();
    let userChecked = {userId: body.userId, userToken: body.userToken};
    return userChecked || {};
  }

  private _handleError(error: any) {
    console.log("_handleError ", error);
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Promise.reject(errMsg);
  }

}
