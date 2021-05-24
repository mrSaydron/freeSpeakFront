import axios from 'axios'

// import buildPaginationQueryOpts from '@/shared/sort/sorts';

import { BookDto } from '@/model/bookDto.ts'
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
          res.data.pictureUrl = ''
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
          res.data.forEach((book: BookDto) => { book.pictureUrl = '' })
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
      params.append('titleAuthorFilter.contains', bookFilter.titleAuthorFilter)
    }
    if (bookFilter.orPublicBookFilter) {
      params.append('orPublicBookFilter.equals', bookFilter.orPublicBookFilter + '')
    }
    if (bookFilter.know100Filter) {
      params.append('know100Filter.equals', bookFilter.know100Filter + '')
    }
    if (bookFilter.know90Filter) {
      params.append('know90Filter.equals', bookFilter.know90Filter + '')
    }
    if (bookFilter.know50Filter) {
      params.append('know50Filter.equals', bookFilter.know50Filter + '')
    }
    if (bookFilter.know0Filter) {
      params.append('know0Filter.equals', bookFilter.know0Filter + '')
    }

    // sorts
    if (bookFilter.titleSort && bookFilter.titleSort.sortDirection) {
      params.append('sort', `title,${bookFilter.titleSort.sortDirection.direction}`)
      if (bookFilter.titleSort.maxValue) {
        params.append(`startTitle.${bookFilter.titleSort.sortDirection.compare}`, `${bookFilter.titleSort.maxValue}`)
      }
    }
    if (bookFilter.authorSort && bookFilter.authorSort.sortDirection) {
      params.append('sort', `author,${bookFilter.authorSort.sortDirection.direction}`)
      if (bookFilter.authorSort.maxValue) {
        params.append(`startAuthor.${bookFilter.authorSort.sortDirection.compare}`, `${bookFilter.authorSort.maxValue}`)
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
