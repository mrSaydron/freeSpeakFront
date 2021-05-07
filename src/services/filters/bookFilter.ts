import { SortValue } from '@/model/sortValue'

export class BookFilter {
  constructor (
    public titleAuthorFilter?: string,
    public orPublicBookFilter?: boolean,
    public know100Filter?: boolean,
    public know90Filter?: boolean,
    public know50Filter?: boolean,
    public know0Filter?: boolean,

    public titleSort?: SortValue<string>,
    public authorSort?: SortValue<string>,

    public requestCount?: number
  ) {
    this.requestCount = requestCount || 20
  }
}
