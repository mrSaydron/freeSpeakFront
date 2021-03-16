import { WordDto } from '@/model/WordDto'

export interface DictionaryWord {
  id?: number,
  count?: number,
  word?: WordDto,
}

export class DictionaryWordDto implements DictionaryWord {
  constructor(
    public id?: number,
    public count?: number,
    public word?: WordDto,
  ) {
  }
}
