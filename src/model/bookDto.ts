import { IUser } from '@/model/userDto.js'

export interface Book {
  id?: number;
  title?: string;
  author?: string;
  source?: string;
  text?: string | null | ArrayBuffer;
  publicBook?: boolean;
  dictionaryId?: number;
  loadedUserLogin?: string;
  loadedUserId?: number;
  users?: IUser[];
}

export class BookDto implements Book {
  constructor (
    public id?: number,
    public title?: string,
    public author?: string,
    public source?: string,
    public text?: string | null | ArrayBuffer,
    public publicBook?: boolean,
    public dictionaryId?: number,
    public loadedUserLogin?: string,
    public loadedUserId?: number,
    public users?: IUser[]
  ) {
    this.publicBook = this.publicBook || false
  }
}
