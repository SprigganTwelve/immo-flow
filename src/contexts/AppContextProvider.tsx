"use client"

import { createContext, useContext, useState } from "react";
import styles from "./AppContextProvider.module.css"
import { AppThemeType } from "@/utils/themes/appThemeType";
import { AppWhiteTheme } from "@/utils/themes/appWhiteTheme";
import { AppDarkPurpleTheme } from "@/utils/themes/appDarkPuppleTheme";



interface AppContextPropsValue {
    AppTheme: AppThemeType,
    setAppTheme: React.Dispatch<React.SetStateAction<AppThemeType>>
}

export const AppContext = createContext<AppContextPropsValue | null>(null);

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [ AppTheme, setAppTheme ] = useState<AppThemeType>(AppDarkPurpleTheme);

    return ( 
        <AppContext.Provider  value={ { AppTheme, setAppTheme } }>
            { children }
        </AppContext.Provider>
    );
}

export const useAppContext = ()=>{
    const context = useContext(AppContext)
    if(!context){
        throw new Error("Something went wrong with the AppContext")
    }
    return context
}
 

export default AppContextProvider;