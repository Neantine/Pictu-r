import {Component} from '@angular/core';

import { User } from '../user';
import { UsersList } from '../users-list';

@Component({
  selector: 'login-app',
  styles  : [ require('./picture-login.component.css') ] ,
  template: require('./picture-login.component.html')
})

export class LoginComponent {

  userTmp: User = new User({});

  constructor()
  {

  }

  connectUser(userTmp:User)
  {
    this.usersList.checkUser(userTmp)
      .then( picture  => {
          console.log('tout marche bien navette : ' ,picture);
        }
      ).catch(error => {
      this.errorMessage = <any>error
      // TODO getsion display de l'error
    });
  }
}

