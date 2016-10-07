import { Component, OnInit } from '@angular/core';

import { PictureStore } from '../picture-store';
import { PictureDisplay } from '../picture-display';

import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'pr-picture-gallery',
    styles: [ require('./picture-gallery.component.css') ],
  template: require('./picture-gallery.component.html')
})



export class PictureGalleryComponent {

    picturList : [PictureDisplay];
    errorMessage: string;
    userId: string;

    static PROVIDERS = [PictureStore];

    // TypeScript public modifiers
   constructor(private pictureStore: PictureStore, private router:Router, private route: ActivatedRoute) {


   // constructor(private pictureStore: PictureStore, private route: ActivatedRoute) {

      /*this.route.params.subscribe(params => {
        this.pictureList();
        //  this.pictureList(params['userId']);
      });*/
    }

    ngOnInit() {
        console.log('hello `PictureGalleryComponent` component');
        this.route.params.forEach((params: Params) => {
        this.userId = params['userId'];
        console.log("ngOnInit param: ", this.userId);

          this.pictureStore.pictureList(this.userId)
            .then(
              (pictures)  => {
                console.log("pictures: ",pictures);
                this.picturList = pictures.picturesListe;
              },
            ).catch(error => {
            console.log("ici ",error);
            this.errorMessage = <any>error
            // TODO getsion display de l'error
          });

        });
    }

  ngOnDestroy() {
    console.log('byebye `PictureGalleryComponent` component');
  }

}
