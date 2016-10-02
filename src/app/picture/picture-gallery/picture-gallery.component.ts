import { Component } from '@angular/core';

import { Picture } from '../picture';
import { PictureStore } from '../picture-store';

@Component({
    selector: 'pr-picture-gallery',
    styles: [ require('./picture-gallery.component.css') ],
    template: require('./picture-gallery.component.html')
})



export class PictureGalleryComponent {

    static PROVIDERS = [PictureStore];


    // TypeScript public modifiers
    constructor(private pictureStore: PictureStore) {  }

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
                });


    }





}
