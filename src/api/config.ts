import { logApiResult } from '@/decorators/methods'
import { handleResult } from '@/utils'
import { mixMessage } from '@/utils/tools'
import { $get, $post, $put, $delete } from './http'

class ConfigAPI {

  @logApiResult
  async login (p: { username: string, password: string }) {
    return $post('/login', { username: p.username, password: mixMessage(p.password) })
  }

  async loginByToken (): APIPromise<{ user: any, token: string }> {
    const token = localStorage.getItem('token')
    return $post('/autoLogin', { token })
  }

  async getUserById (id: number): APIPromise<TUserRowInfo> {
    return $get('/user', { id })
  }

  @logApiResult
  async getUsers (p?: {
    rid?: number,
    id?: number,
    username?: string,
    page?: number,
    size?: number
  }): APIPromise<{ rows: TUserRowInfo[], count: number }> {
    return $get('/users', p)
  }

  /**
   * 新建用户账号
   */
  async createUser (p: {
    username: string,
    password: string,
    rid: number
  }): APIPromise<any>
  {
    return $post('/account', p)
  }

  /**
   * 修改用户权限
   */
  @logApiResult
  async updateUserAuth (p: { uid: number, auth: number[] }) {
    return $put('/userAuth', p)
  }

  @logApiResult
  async updateUserInfo (p: {
    username?: string,
    password?: string,
    newPassword?: string
  }): APIPromise<{ user: any, token: string }> {
    return $put('/user', p)
  }

  async getAuths (p?: { id?: number, name?: string }) {
    return $get('/authorities', p)
  }

  async getRoles (p?: { id?: number }): APIPromise<{ roles: TRoleRowInfo[] } > {
    return $get('/roles', p)
  }

  /**
   * 仅过去管理员角色
   */
  async getAdminRoles (): APIPromise<{ roles: TRoleRowInfo[] } > {
    return $get('/adminRoles')
  }

  async getRoleOptions (fn: (p?: any) => any): Promise<{ label: string; value: any }[]> {
    const res = await fn()
    if (!handleResult(res)) return []
    const options = res.data.roles.map((v: any) => ({
      label: v.name,
      value: v.id,
    }))
    return options
  }

  async createAuth (p: { id: number, name: string, description?: string }) {
    return $post('/authority', p)
  }

  @logApiResult
  async updateAuthById (p: { id: number, name?: string, description?: string }) {
    return $put('/authority', p)
  }

  async createRole (p: { id: number, name: string, description?: string, auth: number[] }) {
    return $post('/role', p)
  }

  async updateRoleById (p: { id: number, name?: string, description?: string, auth?: number[] }) {
    return $put('/role', p)
  }

  @logApiResult
  async deleteRoleById (p: { id: number }) {
    return $delete('/role', p)
  }

  @logApiResult
  async deleteAuthById (p: { id: number }) {
    return $delete('/authority', p)
  }

  @logApiResult
  async deleteUserById (p: { id: number }) {
    return $delete('/user', p)
  }

}

export default new ConfigAPI()
