export interface Word {
  id?: number,
  word?: string,
  partOfSpeech?: string,
  translate?: string,
}

export class WordDto implements Word {
  constructor(
    public id?: number,
    public word?: string,
    public partOfSpeech?: string,
    public translate?: string,
  ) {
  }
}
