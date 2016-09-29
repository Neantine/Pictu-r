/**
 * Created by Administrateur on 29/09/2016.
 */

import {
  async,
  inject,
  TestBed
} from '@angular/core/testing';
import {PictureUploaderComponent} from "../../../app/picture/picture-uploader/picture-uploader.component";
import {PictureModule} from "../../../app/picture/picutre.module";


describe('PictureUploader', () => {

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        PictureModule
      ]
    }).compileComponents();

  }));

  fit('should display an input of type file', inject([], () => {

    let fixture = TestBed.createComponent(PictureUploaderComponent);

    let pictureUploaderComponent = fixture.componentInstance;

    let element = fixture.debugElement.nativeElement;

    expect(element.querySelector('input[type="file"]')).toBeTruthy();

  }));

});
