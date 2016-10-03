import { Routes } from '@angular/router';

import { PictureUploaderComponent } from "./picture/picture-uploader/picture-uploader.component";
import { PictureGalleryComponent } from "./picture/picture-gallery/picture-gallery.component";


export const ROUTES: Routes = [
  { path: '', component: PictureUploaderComponent },
  { path: '/pictur', component: PictureGalleryComponent },
];
