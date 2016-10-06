import {Component} from '@angular/core';

import { User } from '../user';
import { UsersList } from '../users-list';

@Component({
  selector: 'login-app',
  styles  : [ require('./picture-login.component.css') ] ,
  template: require('./picture-login.component.html')
})

export class LoginComponent {

  static PROVIDERS = [UsersList];
  userTmp: User = new User({});
  errorMessage: string;

  constructor(private usersList:UsersList)
  {
  }

  ngOnInit() {
    console.log('ngOnInit login component');
  }
  connectUser(userTmp:User)
  {
    this.usersList.checkUser(userTmp)
      .then( userToCheck  => {
          console.log('user to check : ' ,userTmp);
        }
      ).catch(error => {
      this.errorMessage = <any>error
      // TODO getsion display de l'error
    });
  }
}

