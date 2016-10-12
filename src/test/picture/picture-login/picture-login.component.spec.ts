/**
 * Created by Administrateur on 10/10/2016.
 */
import {
  async,
  inject,
  TestBed, tick, fakeAsync
} from '@angular/core/testing';
import { LoginComponent }
  from '../../../app/picture/picture-login/picture-login.component';

import {
  PictureModule
}
  from '../../../app/picture/picture.module';

import {
  AuthenticationStore
}
  from '../../../app/user/authentication-store';

describe('LoginComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        PictureModule
      ]
    }).compileComponents();

  }));

xit('should display 2 input text and a button to submit login and password',  fakeAsync(inject(
    [], () => {


      let fixture = TestBed.createComponent(LoginComponent);
      let pictureGalleryComponent = fixture.componentInstance;
      let element = fixture.debugElement.nativeElement;


      expect(element.querySelector(".login")).toBeTruthy();
      expect(element.querySelector(".password")).toBeTruthy();
      expect(element.getElementsByClassName('.ButtonStyle')).toBeTruthy();

    })
  ));


  xit('should connect to user{userLogin:"foo" and userPassword:"bar"',  fakeAsync(inject(
    [AuthenticationStore],
    (authenticationStore) => {


      let fixture = TestBed.createComponent(LoginComponent);
      let pictureGalleryComponent = fixture.componentInstance;
      let element = fixture.debugElement.nativeElement;


      let login =element.querySelector(".login");
      let password =element.querySelector(".password");
      let button =element.getElementsByClassName('.ButtonStyle');


      spyOn(authenticationStore, 'login')
        .and
        .returnValue(Promise.resolve('data:image/jpg;base64,IMAGE_DATA'));


    })
  ));

  xit('should not coonect to user{userLogin:"foo" and userPassword:"tix"',  fakeAsync(inject(
    [], () => {


      let fixture = TestBed.createComponent(LoginComponent);
      let pictureGalleryComponent = fixture.componentInstance;
      let element = fixture.debugElement.nativeElement;


      let login =element.querySelector(".login");
      let password =element.querySelector(".password");
      let button =element.getElementsByClassName('.ButtonStyle');

    })
  ));


});


