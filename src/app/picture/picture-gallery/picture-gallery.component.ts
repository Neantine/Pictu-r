import { Component, OnInit } from '@angular/core';

import { PictureStore } from '../picture-store';
import { PictureDisplay } from '../picture-display';


@Component({
    selector: 'pr-picture-gallery',
    styles: [ require('./picture-gallery.component.css') ],
    template: require('./picture-gallery.component.html')
})



export class PictureGalleryComponent implements OnInit{

    picturList : [PictureDisplay];
    errorMessage: string;

    static PROVIDERS = [PictureStore];

    // TypeScript public modifiers
   constructor(private pictureStore: PictureStore) {
      this.pictureList();

   // constructor(private pictureStore: PictureStore, private route: ActivatedRoute) {

      /*this.route.params.subscribe(params => {
        this.pictureList();
        //  this.pictureList(params['userId']);
      });*/
    }

    ngOnInit() {
        console.log('hello `PictureGalleryComponent` component');
    }

    pictureList() {
      this.pictureStore.pictureList()
            .then(
              (pictures)  => {
                     this.picturList = pictures.picturesListe;
                },
             ).catch(error => {
                  console.log("ici ",error);
                  this.errorMessage = <any>error
                 // TODO getsion display de l'error
      });
    }



}
