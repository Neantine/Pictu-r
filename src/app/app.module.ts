import { NgModule, ApplicationRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
import { App } from './app.component';
import {PictureUploaderComponent} from "./picture/picture-uploader/picture-uploader.component";
import {CommonModule} from "./common.module";

const APP_PROVIDERS = [
  ...PictureUploaderComponent.PROVIDERS
];

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ App ],
  declarations: [
    App
  ],
  imports: [
    CommonModule.forRoot(),
    RouterModule.forRoot(ROUTES, { useHash: true })
  ],
  providers: [
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {
  constructor() {}
}

