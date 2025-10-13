import "./globals.css";

export const metadata = { title: "Message Board" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant" className="h-full">
      <body className="min-h-screen bg-black text-white">
        <div className="mx-auto max-w-2xl px-4 py-8">{children}</div>
      </body>
    </html>
  );
}
