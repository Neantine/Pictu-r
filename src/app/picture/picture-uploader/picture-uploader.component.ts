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
  constructor(private pictureStore: PictureStore) {}

  ngOnInit() {
    console.log('hello `Home` component');
    // this.title.getData().subscribe(data => this.data = data);
  }

  drag(event) {
    this.stopEvent(event);

    console.log("target",event.target.files[0]);

    //this._resetPictureTitle();

    //TODO maybe encode in base 64
    this.pictureTmp.fileToUpload = this.pictureStore.pictureDataBase64(event.target.files[0]);

    //TODO add FileReader for stream data and preview the picture to send
   // this._handleFileSelect(event.target.files[0]);

    //TODO call method _canIupload to set up some style and e label
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
        .subscribe(
          hero  => {
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
    this.pictureTmp.fileToUpload={};
  }

  private  _resetPictureTitle(){
    this.pictureTmp.title="";
  }

  private _handleFileSelect(file){
    //Vérification du type image
    // Only process image files.
    if (!file.type.match('image.*')) {
      console.log("this is not a picture")
      return;
    }

    //creation de notre reader
    var reader = new FileReader();


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
