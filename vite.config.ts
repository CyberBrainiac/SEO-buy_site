import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import autoprefixer from 'autoprefixer';
import crypto from 'crypto';
import getRandom from './src/utils/getRandom';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        autoprefixer({}), // add options if needed
      ],
    },

    /*More flexible config css modules*/
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: (name, filename, css) => {
        const componentName = filename.slice(filename.lastIndexOf('/') + 1, filename.indexOf('.'));

        // Generate hash
        const hash = crypto.createHash('md5').update(css).digest('base64').substring(0, 2);

        return `${componentName}__${name}-${hash}${getRandom.numberInRange(10, 100)}`;
      },
    },
  },
});
