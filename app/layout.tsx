import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import SessionWrapper from "./ui/SessionWrapper";
import { ThemeProvider} from './ui/ThemeProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionWrapper>
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  </SessionWrapper>
  );
}
