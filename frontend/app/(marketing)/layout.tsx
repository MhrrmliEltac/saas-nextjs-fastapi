import { Instrument_Serif } from "next/font/google";

import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";

const accentFont = Instrument_Serif({
  variable: "--font-accent",
  weight: "400",
  style: ["italic"],
  subsets: ["latin"],
});

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`marketing-theme flex flex-1 flex-col ${accentFont.variable}`}>
      <Navbar />
      <main className="flex-1 overflow-x-clip">{children}</main>
      <Footer />
    </div>
  );
}
