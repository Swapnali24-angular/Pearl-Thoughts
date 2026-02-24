import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <style>{`
          [class*="nextjs-"], [id*="nextjs-"], .nextjs-toast, [data-nextjs-toast] {
            display: none !important;
            visibility: hidden !important;
          }
        `}</style>
      </head>
      <body
        className={inter.className}
        {...{
          "data-nordpass-ignore": "true",
          "data-lpignore": "true",
          "data-dashlane-ignore": "true",
          "data-onepassword-ignore": "true"
        }}
      >
        {children}
      </body>
    </html>
  );
}
