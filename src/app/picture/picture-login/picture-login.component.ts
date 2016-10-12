import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationStore } from '../../user/authentication-store';
import { User } from '../../user/user';



@Component({
  selector: 'login-app',
  styles  : [ require('./picture-login.component.css') ] ,
  template: require('./picture-login.component.html')
})


export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  error = '';


  constructor(
    private router: Router,
    private authenticationStore: AuthenticationStore) { }

  ngOnInit() {
    // reset login status
    this.authenticationStore.logout();
  }

  login() {
    this.loading = true;
    this.authenticationStore.login(new User(
      {username: this.model.username,
      password : this.model.password}))
      .then(result => {
        if (result) {
          // login successful
          console.log("Login")
          this.router.navigate(['/pictures', result.username]);
        }
      }).catch(err =>{
      // login failed
      this.error = 'Username or password is incorrect';
      this.loading = false;
    });
  }

  ngOnDestroy() {
    console.log('byebye login component');
  }
}
