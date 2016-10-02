import {
    async,
    inject,
    TestBed, tick, fakeAsync
} from '@angular/core/testing';
import {PictureGalleryComponent} from "../../../app/picture/picture-gallery/picture-gallery.component";
import {PictureModule} from "../../../app/picture/picture.module";
import {PictureStore} from "../../../app/picture/picture-store";


describe('PictureGalleryComponent', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                PictureModule
            ]
        }).compileComponents();

    }));


    xit('should display 3 images or "picture-gallery-item" after a call at method pictureList()',  fakeAsync(inject(
        [PictureStore],
        (pictureStore) => {

        let fixture = TestBed.createComponent(PictureGalleryComponent);
        let pictureGalleryComponent = fixture.componentInstance;
        let element = fixture.debugElement.nativeElement;

        pictureGalleryComponent.pictureList();

        /* Mock PictureStore. */
        spyOn(pictureStore, 'pictureList').and.returnValue(Promise.resolve(
            {
            pictures :
            '[' +
            '{id:1, title: "image 1", url: "C:\Users\ytron\WebstormProjects\Pictu-r\src\test\picture\img\test1.jpg"},' +
            '{id:2, title: "image 2", url: "C:\Users\ytron\WebstormProjects\Pictu-r\src\test\picture\img\test2.jpg"},' +
            '{id:3, title: "image 3", url: "C:\Users\ytron\WebstormProjects\Pictu-r\src\test\picture\img\test3.jpg"}'  +
            ']'
            }
            ));

        let images = element.querySelector('.gallery__item__pictur');

        expect(images.length).toEqual(3);
        //TODO test url and title of picture
    })));




})
