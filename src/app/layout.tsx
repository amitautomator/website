import { Roboto } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { EnhancedCallButton } from "@/components/ui/EnhancedCallButton";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        <title>Business Automation Services | Automate Ideas</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Automate your business processes with our expert solutions. From Google Sheets automation to CRM and WhatsApp, we streamline your workflows."
        />
        <meta
          name="keywords"
          content="business automation, workflow automation, process optimization, business efficiency, automation services, automate ideas, digital transformation, Whatsapp automation, CRM automation, marketing automation, sales automation, customer service automation, Business process automation, Automate business tasks, Automate workflows, Automate operations, Automate business processes, AutomateBusiness, workflow automation solutions, Automate business solutions, Whatsapp automation services, CRM automation tools, Marketing automation software, Sales automation solutions, Customer service automation tools, Google Sheets automation, spreadsheet automation, automate Google Sheets, business spreadsheet automation, custom Google Sheets solutions, Google Sheets workflow automation, Sheets API integration, automate Excel to Google Sheets, automated reporting with Google Sheets, Google Sheets data integration"
        />
        <meta content="yes" name="apple-mobile-web-app-capable" />
        <meta content="IE=edge" http-equiv="x-ua-compatible" />
        <meta
          property="og:title"
          content="Business Automation Services | Automate Ideas"
        />
        <meta
          property="og:description"
          content="Transform your business with our comprehensive automation services."
        />
        <meta property="og:image" content="/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />

        <meta
          property="og:title"
          content="Business Automation Services | Automate Ideas"
        />
        <meta
          property="og:description"
          content="Transform your business with our comprehensive automation services."
        />
        <meta
          property="og:image"
          content="https://yourwebsite.com/og-image.jpg"
        />
        <meta property="og:url" content="https://yourwebsite.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Automate Ideas" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@AutomateIdeas" />
        <meta
          name="twitter:title"
          content="Business Automation Services | Automate Ideas"
        />
        <meta
          name="twitter:description"
          content="Transform your business with our comprehensive automation services."
        />
        <meta
          name="twitter:image"
          content="https://yourwebsite.com/og-image.jpg"
        />

        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <meta name="author" content="Automate Ideas" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />

        <meta name="geo.region" content="IN-UP" />
        <meta name="geo.placename" content="Nandgram, Ghaziabad" />
        <meta name="geo.position" content="28.6897;77.4107" />
      </head>
      <body
        className={`${roboto.className} h-screen w-full bg-[--color-background] font-[--font-primary] text-[--color-foreground] antialiased dark:bg-[--color-background-dark]`}
        data-new-gr-c-s-check-loaded="14.1275"
      >
        <NavBar />
        {children}
        <Footer />
        <EnhancedCallButton />
      </body>
    </html>
  );
}
