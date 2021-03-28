export interface Word {
  id?: number,
  word?: string,
  partOfSpeech?: string,
  translate?: string,
  totalAmount?: number,
  urlPicture?: string,
  urlAudio?: string
}

export class WordDto implements Word {
  constructor(
    public id?: number,
    public word?: string,
    public partOfSpeech?: string,
    public translate?: string,
    public totalAmount?: number,
    public urlPicture?: string,
    public urlAudio?: string
  ) {
  }
}
