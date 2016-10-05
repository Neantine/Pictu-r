/**
 * Created by Lilith on 05/10/2016.
 */
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { User } from '../picture/user';


export class UsersList {

  static PROVIDERS = [
    UsersList
  ];


  constructor(private http: Http) {

  }

  checkUser(user: User): Promise<User> {
    console.log('Sending user infos : ', user);

    let body = JSON.stringify(user);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.get('/api/v1/users/', body, options)
      .toPromise()
      .then(this._checkStatus)
      .then(this._extractData)
      .catch(this._handleError);
  }

  private _checkStatus(response: Response) {
    if (response.status < 200 || response.status >= 300) {
      throw new Error('TODO');
    }
    return response;
  }

  private _extractData(res: Response) {
    let body = res.json();
    let pictureReceived = {id: body.id, title: body.title, url: body.url};
    return pictureReceived || {};
  }


}
