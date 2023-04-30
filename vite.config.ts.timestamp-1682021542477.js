// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vitePluginImp from "vite-plugin-imp";
import { ViteAliases } from "vite-aliases";
import path from "path";
var publicDirMap = {
  "development": "dev",
  "test": "test",
  "simulation": "sim",
  "production": "prod"
};
var vite_config_default = ({ mode }) => defineConfig({
  plugins: [
    react(),
    vitePluginImp({
      optimize: true,
      libList: [
        {
          libName: "antd",
          libDirectory: "es",
          style: (name) => `antd/es/${name}/style`
        }
      ]
    }),
    ViteAliases()
  ],
  resolve: {
    alias: {
      "@": path.resolve("/Users/Dipper/Desktop/Projects/templates/web-admin-template", "/src")
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/css/global.scss";'
      },
      less: {
        javascriptEnabled: true
      }
    }
  },
  build: {
    outDir: publicDirMap[mode] || "prod"
  },
  envPrefix: "APTX_"
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnXG5pbXBvcnQgdml0ZVBsdWdpbkltcCBmcm9tICd2aXRlLXBsdWdpbi1pbXAnXG5pbXBvcnQgeyBWaXRlQWxpYXNlcyB9IGZyb20gJ3ZpdGUtYWxpYXNlcydcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5cbmNvbnN0IHB1YmxpY0Rpck1hcCA9IHtcbiAgJ2RldmVsb3BtZW50JzogJ2RldicsXG4gICd0ZXN0JzogJ3Rlc3QnLFxuICAnc2ltdWxhdGlvbic6ICdzaW0nLFxuICAncHJvZHVjdGlvbic6ICdwcm9kJyxcbn1cblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0ICh7IG1vZGUgfSkgPT4gZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgdml0ZVBsdWdpbkltcCh7XG4gICAgICBvcHRpbWl6ZTogdHJ1ZSxcbiAgICAgIGxpYkxpc3Q6IFtcbiAgICAgICAge1xuICAgICAgICAgIGxpYk5hbWU6ICdhbnRkJyxcbiAgICAgICAgICBsaWJEaXJlY3Rvcnk6ICdlcycsXG4gICAgICAgICAgc3R5bGU6IChuYW1lKSA9PiBgYW50ZC9lcy8ke25hbWV9L3N0eWxlYCxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSksXG4gICAgVml0ZUFsaWFzZXMoKSxcbiAgXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6IHBhdGgucmVzb2x2ZShcIi9Vc2Vycy9EaXBwZXIvRGVza3RvcC9Qcm9qZWN0cy90ZW1wbGF0ZXMvd2ViLWFkbWluLXRlbXBsYXRlXCIsICcvc3JjJyksXG4gICAgfSxcbiAgfSxcbiAgY3NzOiB7XG4gICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgc2Nzczoge1xuICAgICAgICBhZGRpdGlvbmFsRGF0YTogJ0BpbXBvcnQgXCJAL2Nzcy9nbG9iYWwuc2Nzc1wiOycsXG4gICAgICB9LFxuICAgICAgbGVzczoge1xuICAgICAgICBqYXZhc2NyaXB0RW5hYmxlZDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICBvdXREaXI6IHB1YmxpY0Rpck1hcFttb2RlXSB8fCAncHJvZCcsXG4gIH0sXG4gIGVudlByZWZpeDogJ0FQVFhfJywgLy8gXHU4QkJFXHU3RjZFZW52XHU2NTg3XHU0RUY2XHU1M0VGXHU4OUMxXHU1M0Q4XHU5MUNGXHU5RUQ4XHU4QkE0XHU1MjREXHU3RjAwXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFBLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sV0FBVztBQUNsQixPQUFPLG1CQUFtQjtBQUMxQixTQUFTLG1CQUFtQjtBQUM1QixPQUFPLFVBQVU7QUFFakIsSUFBTSxlQUFlO0FBQUEsRUFDbkIsZUFBZTtBQUFBLEVBQ2YsUUFBUTtBQUFBLEVBQ1IsY0FBYztBQUFBLEVBQ2QsY0FBYztBQUNoQjtBQUdBLElBQU8sc0JBQVEsQ0FBQyxFQUFFLEtBQUssTUFBTSxhQUFhO0FBQUEsRUFDeEMsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sY0FBYztBQUFBLE1BQ1osVUFBVTtBQUFBLE1BQ1YsU0FBUztBQUFBLFFBQ1A7QUFBQSxVQUNFLFNBQVM7QUFBQSxVQUNULGNBQWM7QUFBQSxVQUNkLE9BQU8sQ0FBQyxTQUFTLFdBQVc7QUFBQSxRQUM5QjtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELFlBQVk7QUFBQSxFQUNkO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSwrREFBK0QsTUFBTTtBQUFBLElBQ3pGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0gscUJBQXFCO0FBQUEsTUFDbkIsTUFBTTtBQUFBLFFBQ0osZ0JBQWdCO0FBQUEsTUFDbEI7QUFBQSxNQUNBLE1BQU07QUFBQSxRQUNKLG1CQUFtQjtBQUFBLE1BQ3JCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVEsYUFBYSxTQUFTO0FBQUEsRUFDaEM7QUFBQSxFQUNBLFdBQVc7QUFDYixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
