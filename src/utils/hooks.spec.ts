import { describe, expect, it } from 'vitest'
import { context, makeMiddleware, useJwtPayload } from './hooks.ts'
import { testContextHelper } from './test.ts'

const testUserPayload = {
  id: 'admin',
  name: 'admin',
}

const testBreakMiddleware = makeMiddleware(() => {
  return {
    success: false,
    message: 'test break middleware',
  }
})

const testThrowMiddleware = makeMiddleware(() => {
  throw new Error('test throw middleware')
})

describe('hooks', () => {
  it('hooks', async () => {
    await testContextHelper<typeof testUserPayload>({
      payload: testUserPayload,
      callback: async () => {
        const [payload] = useJwtPayload<typeof testUserPayload>()
        expect(payload.id).toEqual('admin')
      },
    })
  })

  it('should catch middleware', async () => {
    await testContextHelper<typeof testUserPayload>({
      payload: testUserPayload,
      callback: async () => {
        const ctx = context()
        try {
          await testBreakMiddleware()
        }
        catch (e: any) {
          expect(e.message).toEqual('middleware break')
          expect((ctx.body as any).success).toEqual(false)
          expect((ctx.body as any).message).toEqual('test break middleware')
        }

        try {
          await testThrowMiddleware()
        }
        catch (e: any) {
          expect(e.message).toEqual('test throw middleware')
          expect(ctx.status).toEqual(500)
        }
      },
    })
  })
})