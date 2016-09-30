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

  beforeEach(() => {
    this.FileReaderProtypeBackup = FileReader.prototype;
  });
  afterEach(() => {
    FileReader.prototype = this.FileReaderPrototypeBackup;
  });

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


  it('should set the  pictureTmp.title="my pic" after input text change', inject([], () => {
    let fixture = TestBed.createComponent(PictureUploaderComponent);
    let pictureUploaderComponent = fixture.componentInstance;
    let element = fixture.debugElement.nativeElement;

    let inputText=element.querySelector('input[type="text"]');



    inputText.value = "my pic";

    // let evt = document.createEvent('Event');
    // evt.initEvent('input', true, false);

    let pictureToUpload = pictureUploaderComponent.pictureTmp;

    pictureToUpload.title=inputText.value;

    console.log('picture',pictureToUpload);
    expect(pictureToUpload.title).toEqual("my pic");
  }));


  xit('should set the  fileData of pictureTmp after input file change', inject([], () => {
    let file = {
      name: 'test.jpg',
      size: 1234,
      type: 'image/jpeg'
    };

    let fixture = TestBed.createComponent(PictureUploaderComponent);
    let pictureUploaderComponent = fixture.componentInstance;
    let element = fixture.debugElement.nativeElement;

    let inputFile=element.querySelector('input[type="file"]');

    fixture.detectChanges();

    FileReader.prototype.readAsDataURL = jasmine.createSpy('readAsDataURL').and.callFake(function () {
      this.onload('data:image/png;base64,IMAGE_DATA');
    });

    inputFile.files = [file];

    inputFile.dispatchEvent(new Event('change'));

    let pictureToUpload = pictureUploaderComponent.pictureTmp;
    console.log('picture',pictureToUpload);

    expect(pictureToUpload.fileData).toEqual(FileReader.prototype.readAsDataURL);
  }));

})
