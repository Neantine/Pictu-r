/**
 * Object Model of a picture ( <title>, (object picture))
 */

export class Picture {
  title: string;
  fileData: string;

<<<<<<< HEAD
  constructor(
    {
      title = '',
      fileData = null
    }:
      { title ? : string, fileData ? : string })
  {
    this.title = title;
    this.fileData = fileData;
  }
  isEqual(picture : Picture) {
    return this === picture;
  }
=======
  constructor( { title = '', fileData = null } : { title? : string, fileData? : string } ) {
    this.title = title;
    this.fileData = fileData;
  }

/*  isEqual ( picture: Picture ) {
    return this === picture;
  }*/

>>>>>>> picture-front-feature
}
