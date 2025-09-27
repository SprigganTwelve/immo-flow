"use client"

import { Geist, Geist_Mono } from "next/font/google";
import NavBar from "@/ui/navBar/navBar";
import SideBar from "@/ui/sidebar/sideBar";
import { useAppContext } from "@/contexts/AppContextProvider";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



const AppWrapper = ({children} : {children: React.ReactNode}) => {

    const { AppTheme } = useAppContext()

    return ( 
        <body
            style={{ color: AppTheme.TEXT }}
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
            <NavBar />
            <SideBar />
            <main className="main">
              {children}
            </main>
        </body>
     );
}
 
export default AppWrapper;