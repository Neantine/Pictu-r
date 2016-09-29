import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import {Picture} from "../picture/picture";
import { Observable }     from 'rxjs/Observable';

import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class PictureStore {

  static PROVIDERS = [
    PictureStore
  ];

  private picturesUrl = '/users';  // URL to web API


  private _picturesList: Picture[] =[];


  constructor (private http: Http) {}



   uploadPicture(picture: Picture): Observable<Picture> {
    console.log("on upload le picture", picture);
    let body = JSON.stringify(picture);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.picturesUrl, body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }


 /* getHeroes (): Observable<Hero[]> {
    return this.http.get(this.heroesUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }*/

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }


  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }


  pictureDataBase64(filePicture ){
    let fileReader = new FileReader();
    if (! filePicture) {
      return;
    }
    fileReader.readAsDataURL(filePicture);
    fileReader.addEventListener("load", function () {
      console.log('result64 : ',fileReader.result );
     return fileReader.result;
    }, false);
  }

}


