import path from 'node:path'
import tsconfigPaths from 'vite-tsconfig-paths'

export default {
  test: {
    setupFiles: path.resolve('src/tests/setup/index.ts'),
  },
  plugins: [tsconfigPaths()],
}
