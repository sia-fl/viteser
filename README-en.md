Write interfaces as functions in front-end projects

![banner.png](md/banner.png)

[[ENGLISH](README-en.md)] [[中文](README.md)]

```tsx
// src/api.ts
import { useEffect, useState } from 'react'
import { db } from './db'

// src/App.tsx
import { getUser } from './api'

export async function getUser(id: number) {
  'use server'
  return db.query(`SELECT * FROM users WHERE id = ${id}`)
}

function App() {
  const [user, setUser] = useState<{
    id: number
    name: string
  }>({ id: 0, name: '' })
  useEffect(() => {
    getUser(1).then(setUser)
  }, [])
  return <div>{user.name}</div>
}
```

## 🏃🏻‍♂️‍➡️ start

---

1. install viteser and other dependencies

```bash
npm install viteser
```

2. modify vite.config.ts

```ts
import { defineConfig } from 'vite'
import { ViteserPlugin } from 'viteser'

// https://vitejs.dev/config/
// noinspection JSUnusedGlobalSymbols
export default defineConfig({
  plugins: [
    ViteserPlugin(),
    // react() or vue() or other . . .
  ],
})
```

#### 🔍 quick start

https://github.com/sia-fl/viteser-demo

#### 📦 best practices (Long-Term Maintenance)

https://github.com/sia-fl/buess
