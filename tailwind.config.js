/** @type {import('tailwindcss').Config} */
module.exports = {
  // v4 可省，但保留對 src/ 掃描 OK
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  important: true, // 先開啟，確保 utility 壓過外部規則；之後可移除
  theme: { extend: {} },
  plugins: [],
};
