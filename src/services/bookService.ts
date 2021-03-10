import axios from 'axios'

// import buildPaginationQueryOpts from '@/shared/sort/sorts';

import { BookDto } from '@/model/bookDto.ts'

const baseApiUrl = 'api/book'

export default class BookService {
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

  public async retrieve (common?: string, startId?: number, requestCount?: number): Promise<BookDto[]> {
    return new Promise<BookDto[]>((resolve, reject) => {
      axios
        .get(baseApiUrl + BookService.requestQuery(common, startId, requestCount))
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  private static requestQuery (common?: string, startId?: number, requestCount?: number): string {
    let result = `?sort=id,asc&size=${requestCount || 8}`

    if (common) {
      result += `&common.contains=${common}`
    }
    if (startId) {
      result += `&id.greaterThan=${startId}`
    }

    return result
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
}
