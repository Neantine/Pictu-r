/**
 * Object Model of a picture ( <title>, (object picture))
 */

export class PictureDisplay {

  title: string;
  id: number;
  url : string;

  constructor( { title = '', url = '', id=-1 } :  {id: number ,title? : string, url : string } ) {
    this.title = title;
    this.id = id;
    this.url = url;
  }

}

