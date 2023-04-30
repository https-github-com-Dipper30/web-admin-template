import moment from 'moment'

/**
 * 防抖 一段时间只执行一次, 并返回异步回调结果
 */
export const asyncDebounce = (fn: any, interval: number = 500) => {
  let timer: any = null
  return async (...args: any) => {
    if (!timer) {
      // 立即执行
      timer = setTimeout(() => {
        clearTimeout(timer)
        timer = null
      }, interval)
      return await fn(...args)
    } else {
      clearTimeout(timer)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return new Promise((resolve: any, reject: any) => {
        timer = setTimeout(async () => {
          clearTimeout(timer)
          timer = null
          const res = await fn(...args)
          resolve(res)
        }, interval)
      })
    }
  }
}

export const debounce = (fn: any, interval: number = 500) => {
  let timer: any = null
  return async (...args: any) => {
    if (!timer) {
      // 立即执行
      timer = setTimeout(() => {
        clearTimeout(timer)
        timer = null
      }, interval)
      fn(...args)
    } else {
      clearTimeout(timer)
      timer = setTimeout(async () => {
        clearTimeout(timer)
        timer = null
        fn(...args)
      }, interval)
    }
  }
}

/**
 * get current unix timestamp
 * @returns current unix timestamp
 */
export const getUnixTS = (): number => {
  return Math.floor(new Date().getTime() / 1000)
}

export const getTS = (): number => {
  return Date.now()
}

export const generateDateByTs = (ts?: number | null, format: string = 'YY-MM-DD hh:mm:ss'): string => {
  if (!ts) ts = getTS()
  if (!format) format = 'YY-MM-DD hh:mm:ss'
  return moment(ts).format(format)
}

/**
 * 根据url解析params
 * @param url
 * @returns { [k: string]: string }
 */
export const getParams = (url: string): { [k: string]: string } => {
  // const pattern = /(?<=\?|&)(?<k>\w+)=(?<v>\w+)/g
  const pattern = /(?<k>\w+)=(?<v>\w+)/g

  const res = url.matchAll(pattern)
  const arr = [...res]
  const p: { [k: string]: string } = {}
  arr.forEach((a: any[]) => {
    p[a[1]] = a[2]
  })
  return p
}

/**
 * 混淆明文，返回密文
 * @param pt
 * @returns
 */
export const mixMessage = (pt: string) => {
  const ct = []
  let initialOffset = 2
  for (const c of pt) {
    const code = c.charCodeAt(0)
    ct.push(String.fromCharCode(code + initialOffset))
    initialOffset = (initialOffset * 2 + 3) % 33
  }
  return ct.join('')
}

/**
 * 对混淆密文解密
 */
export const decryptMessage = (ct: string) => {
  const pt = []
  let initialOffset = 2
  for (const c of ct) {
    const code = c.charCodeAt(0)
    pt.push(String.fromCharCode(code - initialOffset))
    initialOffset = (initialOffset * 2 + 3) % 33
  }
  return pt.join('')
}
