import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/layouts/header";
import Footer from "@/components/layouts/Footer";
import WeatherWidget from "@/components/layouts/WeatherWidget";
import BudgetChatbot from "@/components/layouts/BudgetChatBot";
import ClientChatBots from "@/components/layouts/ClientChatBots";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
  display: 'swap'
});

export const metadata = {
  title: "JharYatra - Explore Jharkhand",
  description: "Your complete guide to exploring Jharkhand's beauty and culture",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`h-full ${roboto.className}`}>
      <body className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-1 w-full relative">
          {children}
        </main>
        <Footer />
        <div className="fixed bottom-4 right-6 z-50">
          <ClientChatBots />
        </div>
        <WeatherWidget />
      </body>
    </html>
  );
}