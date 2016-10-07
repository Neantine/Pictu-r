import {Component} from '@angular/core';

import { User } from '../user';
import { UsersList } from '../users-list';

import { Router } from '@angular/router';

@Component({
  selector: 'login-app',
  styles  : [ require('./picture-login.component.css') ] ,
  template: require('./picture-login.component.html')
})

export class LoginComponent {

  static PROVIDERS = [UsersList];
  userTmp: User = new User({});
  errorMessage: string;

  constructor(private usersList:UsersList, private router:Router)
  {
  }

  ngOnInit() {
    console.log('ngOnInit login component');
  }
  connectUser(userTmp:User)
  {

    this.usersList.checkUser(userTmp)
      .then( userChecked  => {
        console.log("check user ",userChecked.userId);
        this.router.navigate(
          ['gallery', userChecked.userId]
        );
        }
      ).catch(error => {
      this.errorMessage = <any>error
      // TODO getsion display de l'error
    });
  }

  ngOnDestroy() {
    console.log('byebye login component');
  }
}

