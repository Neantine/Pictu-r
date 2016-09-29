/**
 * Object Model of a picture ( <title>, (object picture))
 */

export class Picture {
  title: string;
  fileData: Object;

  constructor({title="", fileData=null}: {title?:string, fileData?: Object}) {
    this.title = title;
    this.fileData = fileData;
  }

  isEqual(picture: Picture) {
    return this === picture;
  }
}
