import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Financial Dashboard',
  description: 'Track financial markets, news, and geopolitical events in real-time',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
       <body className={`${inter.className} antialiased`}>
       <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">
           FinDashboard
       </h1>
       </body>
     </html>
  );
}