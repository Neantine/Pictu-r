
import { NgModule } from '@angular/core';
import { CommonModule } from "../common.module";
import { UsersList } from "./users-list";
import { HomeComponent } from "./picture-home/picture-home.component";
import { LoginComponent } from "./picture-login/picture-login.component";


@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule.modules()
  ],
  providers: [
    UsersList.PROVIDERS
  ]
})
export class LoginModule {
}
