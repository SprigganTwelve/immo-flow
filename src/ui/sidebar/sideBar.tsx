"use client"

import clsx from "clsx";

import React, { 
    useRef,
    useState,
    MouseEvent,
    RefObject,
    useCallback,
    useLayoutEffect,
} from "react";
import { useAppContext } from "@/contexts/AppContextProvider";


import Image from "next/image";

import { parseToPercent } from "@/utils/convertion"

import RentSVGLogo from "@/assets/icons/svg/white/parquet-svgrepo-com 1.svg" 
import ClientSVGLogo from "@/assets/icons/svg/white/client-svg.svg"
import MaintenanceSVGLogo from "@/assets/icons/svg/white/maintenance.svg"
import MonitoringSVGLogo from "@/assets/icons/svg/white/supervising.svg"
import SettingsSVGLogo from "@/assets/icons/svg/white/settings.svg"

import { StaticImport } from "next/dist/shared/lib/get-img-props";
import styles from "./style.module.css"




type RadiusConfig = [number, number, number, number];



let [ 
    outerRadiusX, outerRadiusY,
    innerRadiusX, innerRadiusY
]: RadiusConfig = [300, 20, 30, 30]


//punchy : [60, 120, 20, 20] // minimalist and net: [50, 100, 15, 25]  //  dynamic and modern: [30, 50, 10, 10] // smooth and fluid : [40, 80, 20, 15, [[50, 30]];  // outer line --220




const SideBar = () => {

    const { AppTheme } = useAppContext()
    const activeRef = useRef<HTMLDivElement | null>(null)
    const containerRef = useRef<HTMLDivElement | null>(null)

    const [ outLineShape, setOutlineShape ] = useState<string>(
        "M0,0 L1,0 L1,1 L0,1 Z"
    );

    const [ activeMenu, setActiveMenu ] = useState<string>("rent")

    const handleIsMenuActive = useCallback((event: React.MouseEvent<HTMLDivElement>, active: string)=>{
        setActiveMenu(active)
    },[])

    useLayoutEffect(()=>{
        if(!activeRef.current || !containerRef.current){
            return
        }


        const dimens = activeRef.current.getBoundingClientRect()
        const containerMaxWidth = containerRef.current.offsetWidth
        const containerMaxHeight = containerRef.current.offsetHeight

        const x = parseToPercent(dimens.x, containerMaxWidth)
        const y = parseToPercent(dimens.y, containerMaxHeight)
        const x2 = x + parseToPercent(dimens.width, containerMaxWidth)
        const y2 = y + parseToPercent(dimens.height, containerMaxHeight)

        const outerRadiusXPercent = parseToPercent(outerRadiusX, containerMaxWidth)
        const outerRadiusYPercent = parseToPercent(outerRadiusY, containerMaxHeight)
        const innerRadiusXPercent = parseToPercent(innerRadiusX, containerMaxWidth)
        const innerRadiusYPercent = parseToPercent(innerRadiusY, containerMaxHeight)


        const shape = `
            M0,0 L1,0 
            L${x2},${y - outerRadiusYPercent} 
            A${outerRadiusXPercent} ${outerRadiusYPercent} 0 0 1 ${x2 - outerRadiusXPercent},${y} 
            L${x + innerRadiusXPercent},${y} 
            A${innerRadiusXPercent} ${innerRadiusYPercent} 0 0 0 ${x},${y + innerRadiusYPercent} 
            L${x},${y2 - innerRadiusYPercent} 
            A${innerRadiusXPercent} ${innerRadiusYPercent} 0 0 0 ${x + innerRadiusXPercent},${y2} 
            L${x2 - outerRadiusXPercent},${y2} 
            A${outerRadiusXPercent} ${outerRadiusYPercent} 0 0 1 ${x2},${y2 + outerRadiusYPercent} 
            L1,1 L0,1 Z
        `

        setOutlineShape(shape)
    },[activeMenu])


    return ( 
        <div 
            ref={containerRef}
            style={{ 
                [ "--textColor" as any ] : AppTheme.SIDEBAR.TEXTCOLOR,
                [ "--backgroundColor" as any ] : AppTheme.SIDEBAR.BACKGROUNDCOLOR,
                [ "--activeTextColor" as any ] : AppTheme.SIDEBAR.ACTIVE?.TEXTCOLOR || AppTheme.SIDEBAR.TEXTCOLOR
            }}
            className={styles.container}
        >
            <div className={styles.content} >
                <MenuItem 
                    text="Rent"
                    leading={RentSVGLogo}
                    ref={activeMenu === "rent" ? activeRef : undefined}
                    onClick={(event) => handleIsMenuActive(event, "rent")}
                    className={ activeMenu === "rent" ? styles.isActive : "" }
                />
                <MenuItem 
                    text="Tenants"
                    leading={ClientSVGLogo}
                    ref={activeMenu === "tenants" ? activeRef : undefined}
                    onClick={(event) => handleIsMenuActive(event, "tenants")}
                    className={ activeMenu === "tenants" ? styles.isActive : "" }
                />
                <MenuItem 
                    text="Maintenance"
                    leading={MaintenanceSVGLogo}
                    ref={activeMenu === "maintenance" ? activeRef : undefined}
                    onClick={(event) => handleIsMenuActive(event, "maintenance")}
                    className={ activeMenu === "maintenance" ? styles.isActive : "" }
                />
                <MenuItem 
                    text="Monitoring"
                    leading={MonitoringSVGLogo}
                    ref={activeMenu === "monitoring" ? activeRef : undefined}
                    onClick={(event) => handleIsMenuActive(event, "monitoring")}
                    className={ activeMenu === "monitoring" ? styles.isActive : "" }
                />
                <MenuItem 
                    text="Settings"
                    leading={SettingsSVGLogo}
                    ref={activeMenu === "settings" ? activeRef : undefined}
                    onClick={(event) => handleIsMenuActive(event, "settings")}
                    className={ activeMenu === "settings" ? styles.isActive : "" }
                />
                <svg width="0" height="0">
                    <defs>
                        <clipPath id="containerShape" clipPathUnits="objectBoundingBox">
                            <path strokeLinecap="round" strokeLinejoin="round"  d={outLineShape} /> 
                        </clipPath>
                    </defs>
                </svg>
            </div>
        </div>
    );
}



export default SideBar;





const MenuItem: React.FC<{
    alt?: string;
    text: string;
    className?: string;
    leading: string | StaticImport;
    ref?: RefObject<HTMLDivElement | null> | undefined;
    onClick?: (event: MouseEvent<HTMLDivElement>)=> void;
}> = ({
    ref,
    text,
    leading,
    onClick,
    alt = "",
    className
}) => {
    return ( 
        <div
            ref={ref}
            onClick={onClick} 
            className={clsx(styles.menuContainer, className)}
        >
            <div>
                <Image 
                    src={leading} alt={alt}
                    className="icon-object-properties icon-medium-size "
                />
                <span>{text}</span>
            </div>
        </div>
    );
}
