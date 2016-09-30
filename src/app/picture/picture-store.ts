import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import {Picture} from "../picture/picture";


import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class PictureStore {

  static PROVIDERS = [
    PictureStore
  ];

  private picturesUrl = '/api/v1/users/1/pictures';  // URL to web API

  constructor(private http: Http) {
    console.log('hello `PictureStore` class');
  }

  uploadPicture(picture: Picture): Promise<Picture> {
    console.log("on upload le picture", picture);

    let body = JSON.stringify(picture);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.post(this.picturesUrl, body, options)
      .toPromise()
      .then(this._extractData)
      .catch(this._handleError);
  }

  pictureList(): Promise<Picture[]> {
    return this.http.get(this.picturesUrl)
      .toPromise()
      .then(this._extractData)
      .catch(this._handleError);
  }


  private _extractData(res: Response) {

    let body = res.json();
    let pictureReceived =  {id: body.id, title: body.title, url: body.url};
    return pictureReceived || {};
  }

  /**
   *
   * @param file
   * @param cb
   */
  handleFileSelect(file,cb) {
    console.log('_handleFileSelect');

    if (!file) {
      cb(null);
    }

    // Only process image files.
    if (!file.type.match('image.*')) {
      console.log("this is not a picture")
      cb(null);
    }

    let fileReader = new FileReader();

    fileReader.readAsDataURL(file);

    fileReader.addEventListener("load", function () {
        console.log('result64 : ', fileReader.result);
        cb( fileReader.result);
      },  false);
  }


  private _handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Promise.reject(errMsg);
  }


}

