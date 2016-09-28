/**
 * Object Model of a picture ( <title>, (object picture))
 */

export class Picture {
  title: string;
  fileToUpload: Object;

  constructor({title="", fileToUpload=null}: {title?:string, fileToUpload?: Object}) {
    this.title = title;
    this.fileToUpload = fileToUpload;
  }

  isEqual(picture: Picture) {
    return this === picture;
  }
}
