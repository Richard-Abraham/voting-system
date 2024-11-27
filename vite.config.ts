import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: [
      '@supabase/supabase-js',
      'react',
      'react-dom',
      'react-router-dom',
      '@tanstack/react-query',
      'react-hook-form',
      '@hookform/resolvers/zod',
      'zod'
    ]
  }
}) 