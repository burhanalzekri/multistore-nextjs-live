import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ModalProvider } from "@/components/modal-provider";
export const metadata: Metadata = {
  title: { default: "MultiStore — أنشئ متجرك الإلكتروني", template: "%s | MultiStore" },
  description:
    "منصة متاجر إلكترونية متعددة البائعين، أنشئ متجرك وأدر منتجاتك وطلباتك من مكان واحد.",
  applicationName: "MultiStore",
  manifest: "/manifest.json",
  icons: { icon: "/icons/icon.svg" },
};
export const viewport: Viewport = {
  themeColor: "#f59e0b",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body>
        <ModalProvider>{children}</ModalProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `if('serviceWorker' in navigator && location.protocol.startsWith('http')) window.addEventListener('load',()=>navigator.serviceWorker.register('/sw.js').catch(()=>{}));`,
          }}
        />
      </body>
    </html>
  );
}
