import { SortValue } from '@/model/sortValue'

export class BookFilter {
  constructor (
    public titleAuthorFilter?: string,
    public orPublicBookFilter?: boolean,
    public titleSort?: SortValue<string>,
    public knowSort?: SortValue<number>,
    public requestCount?: number
  ) {
    this.requestCount = requestCount || 20
  }
}
