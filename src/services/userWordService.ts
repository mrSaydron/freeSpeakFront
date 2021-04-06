import axios from 'axios'
import { UserWordDto } from '@/model/userWordDto.ts'
import { SortValue } from '@/model/sortValue'

const baseApiUrl = '/api/user-word'

export default class UserWordService {
  public async retrieve (): Promise<UserWordDto[]> {
    return new Promise<UserWordDto[]>((resolve, reject) => {
      axios
        .get(baseApiUrl + UserWordService.requestQuery())
        .then(res => {
          res.data.forEach((item: UserWordDto) => UserWordDto.fill(item))
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  private static requestQuery (): string {
    return ''
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
}
