/**
 * Created by Administrateur on 29/09/2016.
 */

import {NgModule} from '@angular/core';
import {PictureUploaderComponent} from "./picture-uploader/picture-uploader.component";
import {CommonModule} from "../common.module";
import {PictureStore} from "./picture-store";

@NgModule({
  declarations: [
    PictureUploaderComponent
  ],
  imports: [
    CommonModule.forRoot()
  ],
  providers: [
    PictureStore.PROVIDERS
  ]
})
export class PictureModule {
}
