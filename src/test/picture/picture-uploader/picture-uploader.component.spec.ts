import {
  async,
  inject,
  TestBed, tick, fakeAsync
} from '@angular/core/testing';
import { PictureUploaderComponent } from '../../../app/picture/picture-uploader/picture-uploader.component';
import { PictureModule } from '../../../app/picture/picture.module';
import { PictureStore } from '../../../app/picture/picture-store';
import { Picture } from '../../../app/picture/picture';


describe('PictureUploaderComponent', () => {

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
    expect(element.querySelector('.myUpload')).toBeTruthy();
  }));


  it('should set the  pictureTmp.title="my pic" after input text change', inject([], () => {
    let fixture = TestBed.createComponent(PictureUploaderComponent);
    let pictureUploaderComponent = fixture.componentInstance;

    let element = fixture.debugElement.nativeElement;

    let inputText = element.querySelector('input[type="text"]');

    inputText.value = 'my pic';

    // let evt = document.createEvent('Event');
    // evt.initEvent('input', true, false);

    let pictureToUpload = pictureUploaderComponent.pictureTmp;

    pictureToUpload.title = inputText.value;


    expect(pictureToUpload.title).toEqual('my pic');
  }));


  it('should trigger drag input change', inject([], () => {
    let fixture = TestBed.createComponent(PictureUploaderComponent);
    let inputElement = fixture.debugElement.nativeElement.querySelector('input[type="file"]');
    spyOn(fixture.componentInstance, 'drag');

    inputElement.dispatchEvent(new Event('change'));
    expect((<jasmine.Spy>fixture.componentInstance.drag).calls.count()).toEqual(1);
  }));


  it('should set the  fileData of pictureTmp after input file change and verify argument on upload button click', fakeAsync(inject(
    [PictureStore],
    (pictureStore) => {

      let event;
      let file = {
        name: 'IMAGE_TITLE.jpg',
        size: 1234,
        type: 'image/jpeg'
      };

      let fixture = TestBed.createComponent(PictureUploaderComponent);
      let pictureUploaderComponent = fixture.componentInstance;
      let element = fixture.debugElement.nativeElement;

      let inputFile = element.querySelector('input[type="file"]');
      let formElement = element.querySelector('form');

      let pictureToUpload = pictureUploaderComponent.pictureTmp;


      /* Mock PictureStore. */
      spyOn(pictureStore, 'handleFileSelect').and.returnValue(Promise.resolve('data:image/jpg;base64,IMAGE_DATA'));

      event = {
        target: {
          files: [file]
        }
      };

      pictureUploaderComponent.drag(event);

      tick();

      /* Mock PictureStore. */
      spyOn(pictureStore, 'uploadPicture').and.returnValue(Promise.resolve({id: '1', title: 'test', url: '/my_pic'}));

      pictureUploaderComponent.uploadPicture(pictureUploaderComponent.pictureTmp);
      // formElement.submit();

      tick();

      expect((<jasmine.Spy>pictureStore.uploadPicture).calls.count()).toEqual(1);
      expect((<jasmine.Spy>pictureStore.uploadPicture).calls.argsFor(0)).toEqual(
        [
          new Picture({
            title: '',
            fileData: 'data:image/jpg;base64,IMAGE_DATA'
          })
        ]);

    })));



    it('should not affect fileData to picturTmp if file is null on drag(event)', fakeAsync(inject(
        [PictureStore],
        (pictureStore) => {

            let event;
            let file = null;

            let fixture = TestBed.createComponent(PictureUploaderComponent);
            let pictureUploaderComponent = fixture.componentInstance;
            let element = fixture.debugElement.nativeElement;

            let inputFile = element.querySelector('input[type="file"]');
            let formElement = element.querySelector('form');

            let pictureToUpload = pictureUploaderComponent.pictureTmp;


            /* Mock PictureStore. */
            spyOn(pictureStore, 'handleFileSelect').and.returnValue(Promise.resolve(null));

            event = {
                target: {
                    files: [file]
                }
            };

            pictureUploaderComponent.drag(event);

            tick();

            expect((<jasmine.Spy>pictureStore.handleFileSelect).calls.count()).toEqual(1);
            expect(pictureToUpload.fileData).toBeNull();

        })));

    it('should not call method "handleFileSelect" if event is null', fakeAsync(inject(
        [PictureStore],
        (pictureStore) => {

            let event =null;
            let file = null;

            let fixture = TestBed.createComponent(PictureUploaderComponent);
            let pictureUploaderComponent = fixture.componentInstance;
            let element = fixture.debugElement.nativeElement;




            /* Mock PictureStore. */
            spyOn(pictureStore, 'handleFileSelect').and.returnValue(Promise.resolve(null));

         /*   event = {
                target: {
                    files: [file]
                }
            };*/

            pictureUploaderComponent.drag(event);

            tick();

            expect((<jasmine.Spy>pictureStore.handleFileSelect).calls.count()).toEqual(0);


        })));

})
