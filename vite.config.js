import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@src',
        replacement: path.resolve(path.join(__dirname, '/src'))
      },
      {
        find: '@components',
        replacement: path.resolve(path.join(__dirname, '/src/components'))
      },
      {
        find: '@pages',
        replacement: path.resolve(path.join(__dirname, '/src/components/pages'))
      },
      {
        find: '@layouts',
        replacement: path.resolve(path.join(__dirname, '/src/components/layouts'))
      },
      {
        find: '@organisms',
        replacement: path.resolve(path.join(__dirname, '/src/components/organisms'))
      },
      {
        find: '@molecules',
        replacement: path.resolve(path.join(__dirname, '/src/components/molecules'))
      },
      {
        find: '@atoms',
        replacement: path.resolve(path.join(__dirname, '/src/components/atoms'))
      },
      {
        find: '@services',
        replacement: path.resolve(path.join(__dirname, '/src/services'))
      },
      {
        find: '@utils',
        replacement: path.resolve(path.join(__dirname, '/src/utils'))
      },
      {
        find: '@hooks',
        replacement: path.resolve(path.join(__dirname, '/src/hooks'))
      }
    ]
  }
})
