"use client"

import { DarkPurpleTheme } from "@/utils/themes/darkPuppleTheme";
import { createContext, useState } from "react";
import { WhiteTheme } from "@/utils/themes/whiteTheme";

import styles from "./AppContextProvider.module.css"



interface AppContextPropsValue {
    AppTheme: Readonly<{
        TEXT: string;
        BORDERCOLOR: string;
        ASIDEBACKGROUND: string;
        NAVBARBACKGROUND: string;
        CURVEBACKGROUND: string;
        PLAINBACKGROUND: string;
    }>
}

export const AppContext = createContext<AppContextPropsValue>({ 
    AppTheme: DarkPurpleTheme
});

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [ AppTheme, setAppThemes ] = useState(DarkPurpleTheme);

    return ( 
        <AppContext.Provider  value={ { AppTheme } }>
            { children }
        </AppContext.Provider>
    );
}
 
export default AppContextProvider;