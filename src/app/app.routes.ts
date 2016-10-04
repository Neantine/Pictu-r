import { Routes } from '@angular/router';

import { PictureUploaderComponent }   from  "./picture/picture-uploader/picture-uploader.component";
import { PictureGalleryComponent }    from  "./picture/picture-gallery/picture-gallery.component";
import { homecomp }                   from  "./picture/picture-home/picture-home";


export const ROUTES: Routes = [
  { path: '', component: PictureGalleryComponent },
  { path: 'pictures', component: PictureUploaderComponent },
  { path: 'index', component: homecomp },
];
