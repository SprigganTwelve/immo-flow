"use client"


import React, { useState, useEffect } from "react";
import { useAppContext } from "@/contexts/AppContextProvider";

import Switch from '@/ui/switch/switch'

import { LogoIconModel3 } from "@/icons/logos";
import {
    Search4SvgrepoCom,
    PaymentEuroSvgrepoCom,
    DashboardSvgrepoCom,
    ClientSvgrepoCom,
    AnalysisOfBusinessStatisticsInALineGraphicWithPointsSvgrepoCom,
    CurrentLayerSvgrepoCom,
    LightSvgrepoCom,
    NightSvgrepoCom,
    RentSvgrepoCom,
    ChevronSmallRightSvgrepoCom
} from "@/icons";


import styles from "./style.module.css"
import clsx from "clsx";
import { AppDarkTheme, AppWhiteTheme } from "@/utils/appThemes";




interface SideBarProps{
    size?: number
    svgFill: string
}



export default function SideBar({
    size= 25, svgFill
}: SideBarProps){
  
    const { setAppTheme } = useAppContext()

    const [ activateMenu, setActivateMenu ] = useState<string>("overview")
    const [ switchThemeOn, setSwitchThemeOn ] = useState<boolean>(false)
    const [ shouldDraw, setShouldDraw ] = useState<boolean>(false)

    useEffect(() => {
        const menu = window.localStorage.getItem("currentMenu");
        if (menu) setActivateMenu(menu);
    }, []);

    return (
        <div className={styles.container}>
            <div className = {styles.wrapper}>

                <div
                    onClick={()=> setShouldDraw(!shouldDraw)} 
                    className={styles.drawerIconContainer}
                    style={{transform: shouldDraw ? "translate(50%) rotate(180deg)" : "" }}
                >
                    <ChevronSmallRightSvgrepoCom  fill={svgFill} height={45} width={45}/>
                </div>

                <MenuItem
                >
                    <LogoIconModel3 fill={svgFill} height={size} width={size}/>
                    <div className={shouldDraw ?  styles.drawingEffect : styles.discardedItem }>
                        <span className={styles.appName}> ImmoFlow </span>
                    </div>
                </MenuItem>

                <div className={styles.menuSection}>

                    <div className={clsx(styles.inputContainer, shouldDraw ? styles.drawingEffect : styles.discardedItem )}>
                        <Search4SvgrepoCom className={styles.searchIcon}  height={30} width={30} />
                        <input type="text" className={styles.input} placeholder="Search"/>
                    </div>

                    <MenuItem
                        onClick={()=> {
                            setActivateMenu("overview")
                            localStorage.setItem("currentMenu", "overview")
                        }}
                        activateCondition={activateMenu === "overview"}
                    >
                        <DashboardSvgrepoCom fill={svgFill} height={size} width={size}/>
                        <div className={shouldDraw ? styles.drawingEffect : styles.discardedItem }>
                            <span className={styles.title}>Overview</span>
                        </div>
                    </MenuItem>
                    
                    <MenuItem
                        onClick={()=> {
                            setActivateMenu("holders")
                            localStorage.setItem("currentMenu", "holders")
                        }}
                        activateCondition={activateMenu === "holders"}
                    >
                        <ClientSvgrepoCom fill={svgFill} height={size} width={size}/>
                        <div className={ shouldDraw ? styles.drawingEffect : styles.discardedItem }>
                            <span className={styles.title}>Lease Holder</span>
                        </div>
                    </MenuItem>

                    <MenuItem
                        onClick={()=> {
                            setActivateMenu("transaction")
                            localStorage.setItem("currentMenu", "transaction")
                        }}
                        activateCondition={activateMenu === "transaction"}
                    >
                        <PaymentEuroSvgrepoCom fill={svgFill} height={size} width={size}/>
                        <div className={ shouldDraw ? styles.drawingEffect : styles.discardedItem }>
                            <span className={styles.title}>Transaction</span>
                        </div>
                    </MenuItem>

                    <MenuItem
                        onClick={()=> {
                            setActivateMenu("estate")
                            localStorage.setItem("currentMenu", "estate")
                        } }
                        activateCondition={activateMenu === "estate"}
                    >
                        <CurrentLayerSvgrepoCom fill={svgFill} height={size} width={size}/>
                        <div className={shouldDraw ? styles.drawingEffect : styles.discardedItem}>
                            <span className={styles.title}>Estate</span>
                        </div>
                    </MenuItem>

                    <MenuItem
                        onClick={()=> {
                            setActivateMenu("analytics")
                            localStorage.setItem("currentMenu", "analytics")
                        } }
                        activateCondition={activateMenu === "analytics"}
                    >
                        <AnalysisOfBusinessStatisticsInALineGraphicWithPointsSvgrepoCom fill={svgFill} height={size} width={size}/>
                        <div className={shouldDraw ? styles.drawingEffect : styles.discardedItem}>
                            <span className={styles.title}>Analytics</span>
                        </div>
                    </MenuItem>

                    <div className={styles.switchContainer}>
                        <div className={ shouldDraw ? styles.drawingEffect : styles.discardedItem}>
                            {
                                switchThemeOn ? 
                                            <LightSvgrepoCom  fill={svgFill} height={35} width={35}/>
                                        :   <NightSvgrepoCom  fill={svgFill} height={35} width={35} />
                            }
                            <span className={styles.title}>{switchThemeOn ? "Light Mode" : "Night Mode"}</span>
                        </div>
                        <Switch 
                            state={switchThemeOn}
                            setState={setSwitchThemeOn}
                            onChange={(value)=>{
                                if(value) 
                                    setAppTheme(AppWhiteTheme)
                                else
                                    setAppTheme(AppDarkTheme)
                            }}
                        />
                    </div>

                </div>
            </div>
        </div>
    );
}





interface MenuItemProps{
    onClick?: ()=> void;
    children?: React.ReactNode,
    activateCondition?: boolean;
}

const  MenuItem: React.FC<MenuItemProps> = ({
 onClick,
 children,
 activateCondition,
}) => {
    return (
        <div
            onClick={onClick}
            className={clsx(styles.menuItemContainer, activateCondition &&  styles.menuItemActivate)}
        >
            { children }
        </div>
    );
}

interface MenuGroupProps{
    
}


const MenuGroup: React.FC<MenuGroupProps> = ({

}) => {
    return ( 
        <div>

        </div>
    );
}
 
 