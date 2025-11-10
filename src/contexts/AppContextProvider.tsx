"use client"

import { createContext, useContext, useState } from "react";
import { AppThemeType, AppDarkTheme } from "@/utils/appThemes";



interface AppContextPropsValue {
    AppTheme: AppThemeType,
    setAppTheme: React.Dispatch<React.SetStateAction<AppThemeType>>
}



export const AppContext = createContext<AppContextPropsValue | null>(null);


const AppContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [ AppTheme, setAppTheme ] = useState<AppThemeType>(AppDarkTheme);

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