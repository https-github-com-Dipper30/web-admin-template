import axios from 'axios'
import { errorMessage, getToken } from '@/utils'

export const apiBaseURL = import.meta.env.APTX_BASE_URL + '/api/v1'

export const mHttpConfig = {
  warn: 0,
}

export const http = axios.create({
  baseURL: apiBaseURL,
  timeout: 10000,
  withCredentials: true, // cookies
})

http.defaults.headers.post['Content-Type'] = 'application/json'

http.interceptors.request.use(
  (config: any) => {
    const token = getToken()
    config.headers.token = token
    return config
  },
)

http.interceptors.response.use(
  (response: any) => {
    const { data } = response
    const { code, msg } = data
    switch (code) {
    // define your own Exception Code handler here
    case 200:
    case 201:
      return data
    case 1003:
      errorMessage('Not Authorized')
      return { code, msg }
    default:
      return data
    }
  },
  (error: Error) => error,
)

/**
 * get request
 */
export const $get = (url: string, params?: any): Promise<APIResponse<any>> => {
  if (!params) return http.get(url)
  let count = 1
  for (const attr in params) {
    url += count == 1 ? '?' : '&'
    url += (attr + '=' + params[attr])
    count++
  }
  return http.get(url)
}

/**
 * post request
 */
export const $post = (url: string, params?: any): Promise<APIResponse<any>> => {
  if (!params) return http.post(url)
  return http.post(url, params)
}

/**
 * put request
 */
export const $put = (url: string, params?: any): Promise<APIResponse<any>> => {
  if (!params) return http.put(url)
  return http.put(url, params)
}

/**
 * delete request
 */
export const $delete = (url: string, params?: any): Promise<APIResponse<any>> => {
  if (!params) return http.delete(url)
  return http.delete(url, params)
}

/**
 * file uploader
 */
export const $upload = (url: string, files: File[]): Promise<APIResponse<any>> => {
  const formData = new FormData()
  for (const file of files) formData.append('file', file)
  return http.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data;charset=UTF-8',
    },
  })
}