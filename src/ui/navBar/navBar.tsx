"use client"

import Image from "next/image";

import SearchSVGLogo from "@/assets/icons/svg/white/search-svgrepo-com.svg" 
import BellSVGLogo from "@/assets/icons/svg/white/bell-svgrepo-com.svg"

import LangToogle from "@/ui/langToogle/langToogle"
import {  useAppContext } from "@/contexts/AppContextProvider";


const NavBar = () => {
    
    const { AppTheme } = useAppContext()

    return ( 
        <nav className=" navBar  flex justify-between items-center" style={{ background: AppTheme.NAVBARBACKGROUND }}>
          <div className="ml-20 flex text-2xl space-x-30">
              <h1 className="tracking-widest font-bold text-3xl">DASHBOARD</h1>
              <div className=" relative flex justify-start items-center w-[400px] ">
                  <input 
                      type="text" 
                      placeholder="Search here ..." 
                      className={
                        `
                          glassEffect
                          border-1 outline-none rounded-[5px] text-base pt-[3px] pr-[45px] pb-[3px] pl-[20px] w-full
                        `
                      }
                  />
                  <Image 
                      src={SearchSVGLogo}
                      alt="Search "
                      className="absolute r w-6 h-6  right-2 cursor-pointer"
                  />
              </div>
          </div>

          <div className="flex items-center space-x-7 mr-9">
                <LangToogle />
                <Image src={BellSVGLogo} alt="Bell" className="w-6 h-6 cursor-pointer" />
                <Image src="/images/profil.png" width={40} height={40} alt="profile" className="cursor-pointer rounded-3xl"/>
          </div>
        </nav>
     );
}
 
export default NavBar;