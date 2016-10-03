import {
    async,
    inject,
    TestBed, tick, fakeAsync
} from '@angular/core/testing';
import {PictureGalleryComponent} from "../../../app/picture/picture-gallery/picture-gallery.component";
import {PictureModule} from "../../../app/picture/picture.module";
import {PictureStore} from "../../../app/picture/picture-store";
import {PictureDisplay} from "../../../app/picture/picture-display";


describe('PictureGalleryComponent', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                PictureModule
            ]
        }).compileComponents();

    }));


    it('should display 3 images or "picture-gallery-item" after a call at method pictureList()',  fakeAsync(inject(
        [PictureStore],
        (pictureStore) => {

          let pictures = [
            new PictureDisplay ({id:1, title: 'image 1', url: 'picture/img/test1.jpg'}),
            new PictureDisplay ( {id:2, title: 'image 2', url: 'picture/img/test2.jpg'}),
            new PictureDisplay ({id:3, title: 'image 3', url: 'picture/img/test3.jpg'})
          ];

          /* Mock PictureStore. */
          spyOn(pictureStore, 'pictureList').and.returnValue(Promise.resolve(
            {
              user:1,
              picturesListe :pictures
            }
          ));

        let fixture = TestBed.createComponent(PictureGalleryComponent);
        let pictureGalleryComponent = fixture.componentInstance;
        let element = fixture.debugElement.nativeElement;


          tick();

          fixture.detectChanges();

         let images = element.querySelectorAll('img');

         expect(pictureGalleryComponent.picturList.length).toEqual(pictures.length);
         expect(images.length).toEqual(pictures.length);

        // TODO test url and title of picture
    })));


})
