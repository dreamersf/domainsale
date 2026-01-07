import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      base: '/', // 使用自定义域名时设为 '/'
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react(),
              tailwindcss(),	
              ],
      define: {
        // 构建时注入环境变量，如果不存在则使用空字符串（会触发 fallback）
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY || ''),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY || '')
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
