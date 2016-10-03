import { Component, OnInit } from '@angular/core';

import { PictureStore } from '../picture-store';


@Component({
    selector: 'pr-picture-gallery',
   /* styles: [ require('./picture-gallery.component.css') ],*/
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

      return  {
        user:1,
        pictures :
          [
            {id:1, title: 'image 1', url: 'C:/Users/ytron/WebstormProjects/Pictu-r/src/test/picture/img/test1.jpg'},
            {id:2, title: 'image 2', url: 'C:/Users/ytron/WebstormProjects/Pictu-r/src/test/picture/img/test2.jpg'},
            {id:3, title: 'image 3', url: 'C:/Users/ytron/WebstormProjects/Pictu-r/src/test/picture/img/test3.jpg'}]
      }
    ;
     /* this.pictureStore.pictureList()
            .then(
                pictures  => {
                  console.log('picturc',pictures);
                  return pictures;
                   // TODO ???
                },
                error =>  {
                  // TODO handle error
                  console.log('picturc',error);

                });*/
    }


}
