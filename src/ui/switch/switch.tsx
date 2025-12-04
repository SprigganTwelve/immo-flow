

import { useState } from "react";
import styles from "./style.module.css"

interface SwitchProps{
    state: boolean;
    setState: React.Dispatch<React.SetStateAction<boolean>>,
    defaultValue?: boolean;
    onChange?: (bool: boolean)=> void;
    children?: React.ReactNode
}

const Switch: React.FC<SwitchProps> = ({defaultValue, onChange, children, state, setState}) => {
    return ( 
            <div 
                className={styles.container}
                onClick={()=>{
                    console.log("Event handler, click!!");
                    if(setState)
                        setState(!state);
                    if(onChange) onChange(!state);
                }}
            >
                <div className={styles.knob} style={{ transform: state ? 'translate(100%)' : 'translate(0)' }} />
                {children}
            </div>
    );
}
 
export default Switch;