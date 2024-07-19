import { response } from 'viteser/dist/util'
import { info } from './data'

export async function a(name: string) {
  'use server'

  return {
    hello: `${info.name} ${info.version} ${name} ${info.count++}`,
  }
}

export async function boom(w: string) {
  'use server'
  return response(`${w} ${info.version} ${info.count++}`, 201)
}
