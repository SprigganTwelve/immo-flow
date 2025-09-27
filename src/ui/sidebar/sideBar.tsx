"use client";

import HomeSVGLogo from "@/assets/icons/svg/white/home-svgrepo-com.svg" 
import ClientSVGLogo from "@/assets/icons/svg/white/client-svgrepo-com.svg"
import PaymentSVGLogo from "@/assets/icons/svg/white/payment-methods-svgrepo-com.svg"
import ApartmentSVGLogo from "@/assets/icons/svg/white/blueprint-svgrepo-com.svg"
import RentSVGLogo from "@/assets/icons/svg/white/rent-house-svgrepo-com.svg"
import SettingsSVGLogo from "@/assets/icons/svg/white/settings-svgrepo-com.svg"

import MenuItem from "@/ui/sidebar/menu/menuItem"
import { useState } from "react"
import { useAppContext } from "@/contexts/AppContextProvider";


const SideBar = () => {

    const { AppTheme } = useAppContext()
    const [activeMenu, setActiveMenu] = useState("dashboard");

    return ( 
        <aside style={{ background: AppTheme.ASIDEBACKGROUND }}>
            <MenuItem 
                text="Dashboard"
                svgIcon={HomeSVGLogo} alt="icon"
                onClick= {()=>{ setActiveMenu("dashboard") }}
                active={ activeMenu === "dashboard" ? true : false }
            />
            <MenuItem 
                text="Tenants"
                svgIcon={ClientSVGLogo} alt="icon"
                onClick= {()=>{ setActiveMenu("tenants") }}
                active={ activeMenu === "tenants" ? true : false }
            />
            <MenuItem
                text="Payment"
                svgIcon={PaymentSVGLogo} alt="icon"
                onClick= {()=>{ setActiveMenu("payment") }}
                active={ activeMenu === "payment" ? true : false }    
            />
            <MenuItem
                alt="icon"
                text="Appartment"
                svgIcon={ApartmentSVGLogo}
                onClick= {()=>{ setActiveMenu("appartment") }}
                active={ activeMenu === "appartment" ? true : false }
            />
            <MenuItem 
                text="Rent"
                alt="icon"
                svgIcon={RentSVGLogo}
                onClick= {()=>{ setActiveMenu("rent") }}
                active={ activeMenu === "rent" ? true : false }
            />
            <MenuItem
                alt="icon"
                text="Settings"
                svgIcon={SettingsSVGLogo}
                onClick= {()=>{ setActiveMenu("settings") }}
                active={ activeMenu === "settings" ? true : false }
            />
        </aside>
     );
}
 
export default SideBar;