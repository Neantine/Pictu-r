
import { NgModule } from '@angular/core';
import { PictureUploaderComponent } from "./picture-uploader/picture-uploader.component";
import { PictureGalleryComponent } from "./picture-gallery/picture-gallery.component";
import { CommonModule } from "../common.module";
import { PictureStore } from "./picture-store";
import { PicturUrlSanitizerPipe } from "./picture-url-sanitizer";
import { HomeComponent } from "./picture-home/picture-home";
import { LoginComponent } from "./picture-login/picture-login";


@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    PictureUploaderComponent,
    PictureGalleryComponent,
    PicturUrlSanitizerPipe
  ],
  imports: [
    CommonModule.modules()
  ],
  providers: [
    PictureStore.PROVIDERS
  ]
})
export class PictureModule {
}
