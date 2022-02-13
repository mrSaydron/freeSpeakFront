import { BookSentenceHasWordDto } from '@/model/bookSentenceHasWordDto'
import { BookDto } from '@/model/bookDto'
import { BookSentenceDto } from '@/model/bookSentenceDto'

export interface BookSentenceRead {
  id?: number;
  book?: BookDto
  words?: BookSentenceHasWordDto[];
  beforeSentences?: BookSentenceDto[];
  afterSentences?: BookSentenceDto[];
}

export class BookSentenceReadDto implements BookSentenceRead {
  constructor (
    public id?: number,
    public book?: BookDto,
    public words?: BookSentenceHasWordDto[],
    public beforeSentences?: BookSentenceDto[],
    public afterSentences?: BookSentenceDto[]
  ) {
  }
}
