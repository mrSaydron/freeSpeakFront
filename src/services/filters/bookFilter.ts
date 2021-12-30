import { asc, SortValue } from '@/util/sortValue'
import { FilterValues } from '@/util/filterValues'

export class BookFilter {
  public titleAuthor = new FilterValues<string>('titleAuthor')
  public know = new FilterValues<number>('know')
  public title = new FilterValues<string>('title', 'title')
  public author = new FilterValues<string>('author', 'author')

  public sort = new SortValue(this.title, undefined, asc)

  /* eslint no-useless-constructor: "off" */
  constructor (
    public requestCount = 20
  ) {
  }

  addAppend (params: URLSearchParams): void {
    for (const key in this) {
      if (this[key] !== undefined && this[key] !== null
      ) {
        if (key === 'requestCount' && this.requestCount) {
          params.append('size', this.requestCount.toString())
        } else {
          (this[key] as any).addAppends(params)
        }
      }
    }
  }
}
