import path from 'path';

import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint({ exclude: ['/virtual:/**', 'node_modules/**'] })],
  test: {
    globals: true, // global : vitest에서 제공하는 api를 별도의 import없이 전역으로 사용할 수 있음.
    environment: 'jsdom', // jsdom환경에서 실행되도록
    setupFiles: './src/utils/test/setupTests.js', // 실행이 필요한 파일
  },
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
});
