import axios from 'axios'
import { UserWordDto } from '@/model/userWordDto.ts'
import { SortValue } from '@/model/sortValue'

const baseApiUrl = '/api/user-word'

export default class UserWordService {
  private static REQUEST_COUNT_DEFAULT = 10;

  public async retrieve (
    wordFilter?: string,
    partOfSpeechFilter?: string,
    wordSort?: SortValue<string | undefined>,
    startPriority?: SortValue<number | undefined>,
    requestCount?: number
  ): Promise<UserWordDto[]> {
    const params = new URLSearchParams()
    params.append('size', '' + (requestCount || UserWordService.REQUEST_COUNT_DEFAULT))
    UserWordService.fillRequestQuery(
      params,
      wordFilter,
      partOfSpeechFilter,
      wordSort,
      startPriority)

    return new Promise<UserWordDto[]>((resolve, reject) => {
      axios
        .get(`${baseApiUrl}?${params.toString()}`)
        .then(res => {
          res.data.forEach((item: UserWordDto) => UserWordDto.fill(item))
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  private static fillRequestQuery (
    params: URLSearchParams,
    wordFilter?: string,
    partOfSpeechFilter?: string,
    wordSort?: SortValue<string | undefined>,
    startPriority?: SortValue<number | undefined>
  ): void {
    if (wordFilter) {
      params.append('wordFilter.contains', wordFilter)
    }
    if (partOfSpeechFilter) {
      params.append('partOfSpeechFilter.contains', partOfSpeechFilter)
    }
    if (wordSort && wordSort.sortDirection) {
      params.append('sort', `word,${wordSort.sortDirection.direction}`)
      if (wordSort.maxValue) {
        params.append(`startWord.${wordSort.sortDirection.compare}`, wordSort.maxValue)
      }
    }
    if (startPriority && startPriority.sortDirection) {
      params.append('sort', `priority,${startPriority.sortDirection.direction}`)
      if (startPriority.maxValue) {
        params.append(`startPriority.${startPriority.sortDirection.compare}`, `${startPriority.maxValue}`)
      }
    }
  }

  /**
   * Добавление слова в словарь пользователя
   */
  public async addWord (wordId: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios.put(`${baseApiUrl}/add-word/${wordId}`)
        .catch(err => {
          reject(err)
        })
    })
  }

  /**
   * Сброс прогресса слова
   */
  public async eraseWord (wordId: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios.put(`${baseApiUrl}/erase-word/${wordId}`)
        .catch(err => {
          reject(err)
        })
    })
  }

  /**
   * Сброс прогресса переданных слов
   */
  public async eraseWords (wordIds: (number | undefined)[]): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios.put(`${baseApiUrl}/erase-words`, wordIds)
        .catch(err => {
          reject(err)
        })
    })
  }

  /**
   * Сброс прогресса слов по условию
   */
  public async eraseAllWords (
    wordFilter?: string,
    partOfSpeechFilter?: string
  ): Promise<any> {
    const params = new URLSearchParams()
    UserWordService.fillRequestQuery(
      params,
      wordFilter,
      partOfSpeechFilter
    )
    return new Promise<any>((resolve, reject) => {
      axios.put(`${baseApiUrl}/erase-all-words?${params.toString()}`)
        .catch(err => {
          reject(err)
        })
    })
  }

  /**
   * Удаление слова из словаря пользователя
   */
  public async removeWord (wordId: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios.put(`${baseApiUrl}/remove-word/${wordId}`)
        .catch(err => {
          reject(err)
        })
    })
  }

  /**
   * Удаление списка слов из словаря пользователя
   */
  public async removeWords (wordIds: (number | undefined)[]): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios.put(`${baseApiUrl}/remove-words`, wordIds)
        .catch(err => {
          reject(err)
        })
    })
  }

  /**
   * Удаление слов из словаря пользователя по условию
   */
  public async removeAllWords (
    wordFilter?: string,
    partOfSpeechFilter?: string
  ): Promise<any> {
    const params = new URLSearchParams()
    UserWordService.fillRequestQuery(
      params,
      wordFilter,
      partOfSpeechFilter
    )
    return new Promise<any>((resolve, reject) => {
      axios.put(`${baseApiUrl}/remove-all-words?${params.toString()}`)
        .catch(err => {
          reject(err)
        })
    })
  }
}
