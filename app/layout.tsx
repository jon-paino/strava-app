import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import SessionWrapper from "./ui/SessionWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={`${inter.className} antialiased`}>{children}</body>
      </html>
    </SessionWrapper>
  );
}
