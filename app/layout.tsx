import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import "./globals.css";
import { ThemeProvider } from "./providers";
import Footer from './components/Footer';

const geistSans = GeistSans;
const geistMono = GeistMono;

export const metadata: Metadata = {
  title: "Recipe App | Find & Share Recipes",
  description: "Discover delicious recipes by ingredients. Find, save, and share your favorite recipes from around the world.",
  metadataBase: new URL('https://your-recipe-app.com'),
  openGraph: {
    title: 'Recipe App | Find & Share Recipes',
    description: 'Discover delicious recipes by ingredients. Find, save, and share your favorite recipes from around the world.',
    url: 'https://your-recipe-app.com',
    siteName: 'Recipe App',
    images: [
      {
        url: '/og-image.jpg', // Add this image to your public folder
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased no-scrollbar overflow-y-auto flex flex-col min-h-screen`}
      >
        <ThemeProvider attribute="data-theme" defaultTheme="lofi">
          <div className="flex-1">
            {children}
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
