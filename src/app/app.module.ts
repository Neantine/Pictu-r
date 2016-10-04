import { NgModule, ApplicationRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
import { App } from './app.component';
import {CommonModule} from "./common.module";
import {PictureModule} from "./picture/picture.module";

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ App ],
  declarations: [
    App
  ],
  imports: [
    MaterialModule.forRoot(),
    CommonModule.modules(),
    PictureModule,
    RouterModule.forRoot(ROUTES, { useHash: true })
  ],
  providers: [
    ENV_PROVIDERS
  ]
})
export class AppModule {
  constructor() {}
}

