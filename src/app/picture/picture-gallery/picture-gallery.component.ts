import { Component, OnInit } from '@angular/core';

import { PictureStore } from '../picture-store';


@Component({
    selector: 'pr-picture-gallery',
    styles: [ require('./picture-gallery.component.css') ],
    template: require('./picture-gallery.component.html')
})



export class PictureGalleryComponent implements OnInit{

    static PROVIDERS = [PictureStore];




    // TypeScript public modifiers
    constructor(private pictureStore: PictureStore) {
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
                picture  => {
                   // TODO ???
                },
                error =>  {
                  // TODO handle error
                  console.log('picturc',error);

                });
    }


}
