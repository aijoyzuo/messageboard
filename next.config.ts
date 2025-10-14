// next.config.js

module.exports = {
  reactStrictMode: true, // 你可以根據需要選擇開啟
  env: {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
  },
}
