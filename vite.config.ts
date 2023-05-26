import type { UserConfig, ConfigEnv } from 'vite'

import { loadEnv } from 'vite'
import { resolve } from 'path'

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  const isBuild = command === 'build'

  return {
    base: '/',
    root,
    resolve: {
      alias: [
        // @/xxxx => src/xxxx
        {
          find: /@\//,
          replacement: `${pathResolve('src')}/`,
        },
        // #/xxxx => types/xxxx
        {
          find: /#\//,
          replacement: `${pathResolve('types')}/`,
        },
      ],
    },
    server: {
      host: true,
      port: 3456,
      // open: true,
    },
    optimizeDeps: {
      include: [],
      exclude: ['vue-demi'],
    },
  }
}
