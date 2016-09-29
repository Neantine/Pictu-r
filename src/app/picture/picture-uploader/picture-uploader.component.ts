import { Component } from '@angular/core';

import {Picture} from "../picture";
import {PictureStore} from "../picture-store";

@Component({
  selector: 'pr-picture-uploader',
  styles: [ require('./picture-uploader.component.css') ],
  template: require('./picture-uploader.component.html')
})



export class PictureUploaderComponent {

  static PROVIDERS = [PictureStore];

  pictureTmp  : Picture = new Picture({});
  errorMessage: string;


  // TypeScript public modifiers
  constructor(private pictureStore: PictureStore) {
  }

  ngOnInit() {
    console.log('hello `PictureUploaderComponent` component');
  }

  drag(event) {
    console.log("1111111111111111111");

    if(event == undefined){
      return;
    }

    this.stopEvent(event);

    console.log("target",event.target.files[0]);

   this._handleFileSelect(event.target.files[0]);
    console.error("je suis la");
  }

  /**
   * allow the drop event
   * @param event
   */
  stopEvent(event) {
    event.preventDefault();
    event.stopPropagation();
  }


  resetPicture(){
    console.log("on reset le picture");
    this._resetPictureTmp();
  }

  uploadPicture(picture : Picture){
    if (this._canIuploadThisPicture(picture)){
      this.pictureStore.uploadPicture(picture)
        .then(
          picture  => {
            //TODO a reset is really necessary?????
            this._resetPictureTmp();
          },
          error =>  {
            this.errorMessage = <any>error
          });

    }
    else{
      //TODO
    }

/* Angular style

    this.pictureStore.sendPicture(picture)
      .subscribe(
        picture  => {console.log("ok")},
        error =>  {this.errorMessage = <any>error });
*/

  }

  private _resetPictureTmp(){
    //TODO add verification on picture to avoid inutil reset
    this._resetPictureTitle();
    this.pictureTmp.fileData={};
  }

  private  _resetPictureTitle(){
    this.pictureTmp.title="";
  }

  private _handleFileSelect(file){
    console.log('_handleFileSelect');

    // Only process image files.
    if (!file.type.match('image.*')) {
      console.log("this is not a picture")
      return;
    }
    this.pictureTmp.fileData = this.pictureStore.pictureDataBase64(file);
  }



  private _canIuploadThisPicture(picture ){
    console.log(picture.fileToUpload);
    if(picture.fileToUpload==null){
      //no picture files to upload
      console.log("there is no file picture to upload")
      return false;
    }
    console.log(picture.fileToUpload.type);
    //TODO add all verification for type, size, name etc
    if (! picture.fileToUpload.type.match('image/jpeg')) {
      console.log("this is not a jpeg picture")
      return false;
    }
  return true;

  }

}
