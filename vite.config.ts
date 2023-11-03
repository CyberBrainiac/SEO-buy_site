import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import autoprefixer from 'autoprefixer';
import crypto from 'crypto';
import getRandom from './src/utils/getRandom';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  server: {
    port: 4200,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      '@pages': path.resolve(__dirname, './src/'),
      '@components': path.resolve(__dirname, './src/components/'),
      '@containers': path.resolve(__dirname, './src/containers/'),
      '@utils': path.resolve(__dirname, './src/utils/'),
      '@services': path.resolve(__dirname, 'src/services/'),
      '@image': path.resolve(__dirname, 'src/assets/image/'),
      '@style': path.resolve(__dirname, 'src/assets/style/'),
    },
  },
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        autoprefixer({}), // add options if needed
      ],
    },

    // More flexible config css modules
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: (name, filename, css) => {
        const componentName = filename.slice(filename.lastIndexOf('/') + 1, filename.indexOf('.'));

        // Generate hash
        const hash = crypto.createHash('md5').update(css).digest('base64url').substring(0, 2);

        return `${componentName}__${name}-${hash}${getRandom.numberInRange(10, 100)}`;
      },
    },
  },
});
