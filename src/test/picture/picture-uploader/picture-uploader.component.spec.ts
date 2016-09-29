/*
 ICI ON DOIT MOQUER LE PICTURE_STORE
 */


import {
  async,
  inject,
  TestBed
} from '@angular/core/testing';
import {PictureUploaderComponent} from "../../../app/picture/picture-uploader/picture-uploader.component";
import {PictureModule} from "../../../app/picture/picture.module";
import {PictureStore} from "../../../app/picture/picture-store";


describe('PictureUploader', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        PictureModule
      ]
    }).compileComponents();

  }));

  it('should display an input of type file, an input of type text and a button upload', inject([], () => {
    let fixture = TestBed.createComponent(PictureUploaderComponent);
    let pictureUploaderComponent = fixture.componentInstance;
    let element = fixture.debugElement.nativeElement;
    expect(element.querySelector('input[type="file"]')).toBeTruthy();
    expect(element.querySelector('input[type="text"]')).toBeTruthy();
    expect(element.getElementsByClassName('myUpload')).toBeTruthy();
  }));


  it('should not call the upload method of picture file if there is any file selected', inject([], () => {
    let fixture = TestBed.createComponent(PictureUploaderComponent);
    let pictureUploaderComponent = fixture.componentInstance;
    let element = fixture.debugElement.nativeElement;


    let buttonUpload = element.getElementsByClassName('myUpload');
    let fileSelector = element.querySelector('input[type="file"]');

    let pictureStore = TestBed.get(PictureStore);

  }));

})
