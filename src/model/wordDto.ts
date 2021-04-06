import { PartOfSpeechEnum } from '@/model/enums/partOfSpeechEnum'

export interface Word {
  id?: number;
  word?: string;
  partOfSpeech?: string;
  translate?: string;
  totalAmount?: number;
  urlPicture?: string;
  urlAudio?: string;
  frequency?: number;
  frequencyPercent?: string;
  userHas?: boolean;
}

export class WordDto implements Word {
  constructor (
    public id?: number,
    public word?: string,
    public partOfSpeech?: string,
    public translate?: string,
    public totalAmount?: number,
    public urlPicture?: string,
    public urlAudio?: string,
    public frequency?: number,
    public frequencyPercent?: string,
    public partOfSpeechNote?: any,
    public userHas?: boolean
  ) {
    console.log('WordDto')
  }

  /**
   * Запольняет слово полями для отображения
   */
  public static fill (word: WordDto): void {
    if (word.frequency) {
      word.frequencyPercent = (word.frequency * 100).toFixed(2) + ' %'
    }
    if (word.partOfSpeech) {
      word.partOfSpeechNote = PartOfSpeechEnum[word.partOfSpeech]
    }
  }
}
