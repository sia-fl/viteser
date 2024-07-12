import { getContext } from '../resolve/context.ts'

// noinspection JSUnusedGlobalSymbols
export async function responseJson<T>(data: T, code: number = 200): Promise<T> {
  const ctx = getContext()
  const result = ctx.result as {
    code: number
    data: T
  }
  Object.assign(result, {
    code,
    data,
  })
  return data
}