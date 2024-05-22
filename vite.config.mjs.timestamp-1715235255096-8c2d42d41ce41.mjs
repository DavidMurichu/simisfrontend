// vite.config.mjs
import path from "path";
import { defineConfig } from "file:///C:/Users/Paul/Documents/simisfront/simisfront/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/Paul/Documents/simisfront/simisfront/node_modules/@vitejs/plugin-react/dist/index.mjs";
import jsconfigPaths from "file:///C:/Users/Paul/Documents/simisfront/simisfront/node_modules/vite-jsconfig-paths/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react(), jsconfigPaths()],
  // https://github.com/jpuri/react-draft-wysiwyg/issues/1317
  base: "/free",
  // accessing env variable is not possible here. So hard coding this.
  define: {
    global: "window"
  },
  resolve: {
    alias: [
      {
        find: /^~(.+)/,
        replacement: path.join(process.cwd(), "node_modules/$1")
      },
      {
        find: /^src(.+)/,
        replacement: path.join(process.cwd(), "src/$1")
      }
    ]
  },
  server: {
    // this ensures that the browser opens upon server start
    open: true,
    // this sets a default port to 3000
    port: 3e3
  },
  preview: {
    // this ensures that the browser opens upon preview start
    open: true,
    // this sets a default port to 3000
    port: 3e3
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubWpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcUGF1bFxcXFxEb2N1bWVudHNcXFxcc2ltaXNmcm9udFxcXFxzaW1pc2Zyb250XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxQYXVsXFxcXERvY3VtZW50c1xcXFxzaW1pc2Zyb250XFxcXHNpbWlzZnJvbnRcXFxcdml0ZS5jb25maWcubWpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9QYXVsL0RvY3VtZW50cy9zaW1pc2Zyb250L3NpbWlzZnJvbnQvdml0ZS5jb25maWcubWpzXCI7Ly8gaHR0cHM6Ly9naXRodWIuY29tL3ZpdGVqcy92aXRlL2Rpc2N1c3Npb25zLzM0NDhcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0IGpzY29uZmlnUGF0aHMgZnJvbSAndml0ZS1qc2NvbmZpZy1wYXRocyc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3JlYWN0KCksIGpzY29uZmlnUGF0aHMoKV0sXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9qcHVyaS9yZWFjdC1kcmFmdC13eXNpd3lnL2lzc3Vlcy8xMzE3XG4gIGJhc2U6ICcvZnJlZScsIC8vIGFjY2Vzc2luZyBlbnYgdmFyaWFibGUgaXMgbm90IHBvc3NpYmxlIGhlcmUuIFNvIGhhcmQgY29kaW5nIHRoaXMuXG4gIGRlZmluZToge1xuICAgIGdsb2JhbDogJ3dpbmRvdydcbiAgfSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiBbXG4gICAgICB7XG4gICAgICAgIGZpbmQ6IC9efiguKykvLFxuICAgICAgICByZXBsYWNlbWVudDogcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdub2RlX21vZHVsZXMvJDEnKVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgZmluZDogL15zcmMoLispLyxcbiAgICAgICAgcmVwbGFjZW1lbnQ6IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCAnc3JjLyQxJylcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIC8vIHRoaXMgZW5zdXJlcyB0aGF0IHRoZSBicm93c2VyIG9wZW5zIHVwb24gc2VydmVyIHN0YXJ0XG4gICAgb3BlbjogdHJ1ZSxcbiAgICAvLyB0aGlzIHNldHMgYSBkZWZhdWx0IHBvcnQgdG8gMzAwMFxuICAgIHBvcnQ6IDMwMDBcbiAgfSxcbiAgcHJldmlldzoge1xuICAgIC8vIHRoaXMgZW5zdXJlcyB0aGF0IHRoZSBicm93c2VyIG9wZW5zIHVwb24gcHJldmlldyBzdGFydFxuICAgIG9wZW46IHRydWUsXG4gICAgLy8gdGhpcyBzZXRzIGEgZGVmYXVsdCBwb3J0IHRvIDMwMDBcbiAgICBwb3J0OiAzMDAwXG4gIH1cbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUNBLE9BQU8sVUFBVTtBQUNqQixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFdBQVc7QUFDbEIsT0FBTyxtQkFBbUI7QUFJMUIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE1BQU0sR0FBRyxjQUFjLENBQUM7QUFBQTtBQUFBLEVBRWxDLE1BQU07QUFBQTtBQUFBLEVBQ04sUUFBUTtBQUFBLElBQ04sUUFBUTtBQUFBLEVBQ1Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixhQUFhLEtBQUssS0FBSyxRQUFRLElBQUksR0FBRyxpQkFBaUI7QUFBQSxNQUN6RDtBQUFBLE1BQ0E7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLGFBQWEsS0FBSyxLQUFLLFFBQVEsSUFBSSxHQUFHLFFBQVE7QUFBQSxNQUNoRDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUE7QUFBQSxJQUVOLE1BQU07QUFBQTtBQUFBLElBRU4sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLFNBQVM7QUFBQTtBQUFBLElBRVAsTUFBTTtBQUFBO0FBQUEsSUFFTixNQUFNO0FBQUEsRUFDUjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
