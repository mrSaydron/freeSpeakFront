import axios from 'axios'

// import buildPaginationQueryOpts from '@/shared/sort/sorts';

import { BookDto } from '@/model/bookDto.ts'
import { SortValue } from '@/model/sortValue'
import { BookFilter } from '@/services/filters/bookFilter'

const baseApiUrl = '/api/book'

export default class BookService {
  private static REQUEST_COUNT_DEFAULT = 8

  /**
   * Возвращает книгу по ее идентификатору
   * @param id
   */
  public find (id: number): Promise<BookDto> {
    return new Promise<BookDto>((resolve, reject) => {
      axios
        .get(`${baseApiUrl}/${id}`)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  /**
   * Возвращает список книг по запросу
   */
  public async retrieve (bookFilter: BookFilter): Promise<BookDto[]> {
    const params = new URLSearchParams()
    params.append('size', '' + (bookFilter.requestCount || BookService.REQUEST_COUNT_DEFAULT))
    BookService.fillRequestQuery(params, bookFilter)
    return new Promise<BookDto[]>((resolve, reject) => {
      axios
        .get(`${baseApiUrl}?${params.toString()}`)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  /**
   * Формирует запрос с сортировкой и фильтрами
   * @param params
   * @param bookFilter
   * @private
   */
  private static fillRequestQuery (params: URLSearchParams, bookFilter: BookFilter): void {
    if (bookFilter.titleAuthorFilter) {
      params.append('titleAuthor.contains', bookFilter.titleAuthorFilter)
    }
    if (bookFilter.orPublicBookFilter) {
      params.append('orPublicBook.equals', bookFilter.orPublicBookFilter + '')
    }

    // sorts
    if (bookFilter.titleSort && bookFilter.titleSort.sortDirection) {
      params.append('sort', `title,${bookFilter.titleSort.sortDirection.direction}`)
      if (bookFilter.titleSort.maxValue) {
        params.append(`title.${bookFilter.titleSort.sortDirection.compare}`, `${bookFilter.titleSort.maxValue}`)
      }
    }
    if (bookFilter.knowSort && bookFilter.knowSort.sortDirection) {
      params.append('sort', `book.know,${bookFilter.knowSort.sortDirection.direction}`)
      if (bookFilter.knowSort.maxValue) {
        params.append(`know.${bookFilter.knowSort.sortDirection.compare}`, `${bookFilter.knowSort.maxValue}`)
      }
    }
  }

  public delete (id: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .delete(`${baseApiUrl}/${id}`)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  public async create (entity: BookDto): Promise<BookDto> {
    return new Promise<BookDto>((resolve, reject) => {
      axios
        .post(`${baseApiUrl}`, entity)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  public update (entity: BookDto): Promise<BookDto> {
    return new Promise<BookDto>((resolve, reject) => {
      axios
        .put(`${baseApiUrl}`, entity)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  public async sendOpenBook (id: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .put(`${baseApiUrl}/open/${id}`)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
