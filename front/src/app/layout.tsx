import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MSWComponent } from "./_component/MSWcomponent";
import AuthSession from "./_component/AuthSession";
import Script from "next/script";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <script 
        type="text/javascript" 
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services`}/>
      <body className={inter.className}>
        <MSWComponent />
        {/* 이렇게 children을 AuthSession으로 감싸야 children에서 useSession을 사용할 수 있음 */}
        <AuthSession>{children}</AuthSession>
      </body>
    </html>
  );
}
