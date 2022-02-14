export interface BookSentenceHasWord {
  word?: string;
  afterWord?: string;
  translateId?: number;
  partOfSpeech?: string;
}

export class BookSentenceHasWordDto implements BookSentenceHasWord {
  constructor (
    public word?: string,
    public afterWord?: string,
    public translateId?: number,
    public partOfSpeech?: string
  ) {
  }
}
