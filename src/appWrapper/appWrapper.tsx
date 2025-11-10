"use client"

import React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import SideBar from "@/ui/sidebar/sidebar"

import { useAppContext } from "@/contexts/AppContextProvider";
import styles from './style.module.css'



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});




const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});




interface AppWrapperProps<P = any>{
  children: React.ReactElement<P>
}


const AppWrapper = <P,>({children} : AppWrapperProps<P>) => {

    const { AppTheme } = useAppContext()

    return ( 
        <body
            style={{
                color:                            AppTheme.TEXTCOLOR,
                backgroundColor:                  AppTheme.BACKGROUNDCOLOR,
                ["--app-textColor" as any] :                  AppTheme.TEXTCOLOR,
                ["--app-background" as any ] :                AppTheme.BACKGROUNDCOLOR,
                
                ["--app-active-icon-background" as any ] :    AppTheme.ACTIVEICONBACKGROUNDCOLOR || AppTheme.BACKGROUNDCOLOR,
                ["--app-textInput-textColor" as any]:         AppTheme.TEXTINPUT?.TEXTCOLOR || "black",
                ["--app-textInput-background" as any]:        AppTheme.TEXTINPUT?.BACKGROUNDCOLOR || "white",
                ["--app-textInput-placeholderColor" as any]:  AppTheme.TEXTINPUT?.PLACEHOLDERCOLOR || "black",
                ["--app-table-background" as any]:            AppTheme.TABLE?.BACKGROUNDCOLOR  || "",

                ["--app-checkbox-background" as any]:         AppTheme.CHECKBOXINPUT?.BACKGROUNDCOLOR  || "",
                ["--app-checkbox-borderColor" as any]:        AppTheme.CHECKBOXINPUT?.BORDERCOLOR  || "",
                ["--app-checkbox-hover-background" as any]:         AppTheme.CHECKBOXINPUT?.HOVER?.BACKGROUNDCOLOR  || "",
                ["--app-checkbox-active-color" as any]:             AppTheme.CHECKBOXINPUT?.ACTIVE?.COLOR  || "",
                ["--app-checkbox-active-background" as any]:        AppTheme.CHECKBOXINPUT?.ACTIVE?.BACKGROUNDCOLOR  || "",
            }}
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <div className={styles.layout}>
              <SideBar />
              <main className={styles.main}>
                {
                  children
                }
              </main>
          </div>
        </body>
     );
}
 
export default AppWrapper;