
"use client"

import clsx from "clsx";
import { useState } from "react";

const LangToggle = () => {

    const [lang, setLang] = useState("Eng");

    return ( 
        <div 
            className="relative h-7  w-18 pt-[2px] pb-[2px] rounded-[6px]  bg-[#564A94]  overflow-hidden "
        >
            <div className={
                clsx(
                    `
                        absolute left-0 top-0 rounded-[4px] w-9 h-full bg-[#27254C] transition-discrete 
                    `,
                    lang === 'Eng' ? "translate-x-[100%]" : "translate-x-[0%]"
                )
            }/>
            <span
                onClick={()=> setLang('Fr')}
                className="absolute translate-x-[69%] left-0 cursor-pointer font-medium"
            >
                Fr
            </span>
            <span 
                onClick={()=> setLang('Eng')}
                className="absolute translate-x-[-19%] right-0 cursor-pointer font-medium"
            >
                Eng
            </span>
        </div>
    );
}
 
export default LangToggle;