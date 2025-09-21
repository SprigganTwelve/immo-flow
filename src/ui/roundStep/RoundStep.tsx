

import clsx from "clsx";
import styles from '@/ui/roundStep/roundStep.module.css'
import { useCallback, useEffect, useRef } from "react";


interface RoundedStepProps {
      id?: string;                                    // asigning an identifiant
      text?: string;                                  // text used for description
      percent?: number;                                // percent used for the progressor
      svgSize?: number;                               // the size of the circular progressor
      className?: string;                             // customizing style style from parent
      style?: React.CSSProperties;                    // customizing style from parent
      setRef?: (el: HTMLDivElement | null) => void;   // callback to lift up the ref
}



// This fonctionnal components is meant to draw a circular progressor beside a text indicator

const RoundStep: React.FC<RoundedStepProps> = ({ 
      id,
      text,
      style,
      setRef,
      svgSize,
      percent,
      className,
}) => {

      const shouldWrapperStyleBeRemoved = useRef(false) 
      const progressorSize = svgSize ? svgSize : 100;

      const strokeWidth = 3;
      const r = (progressorSize / 2) - strokeWidth / 2;
      const backlight = (style as any)?.["--backlight"] as string | undefined;


      const formatPercent = useCallback((num: number)=>{
            let rounded = Math.round(num * 100) / 100
            
            if(Number.isInteger(rounded)){
                  return rounded;
            }
            

            let str = rounded.toFixed(2)

            if(str.endsWith("0") && !str.endsWith("00")){
                  str = str.slice(0, -1)
            }

            if(str.endsWith(".00")){
                  str = str.slice(0, -3)
            }


            return str;
      },[])




      return (
            <div
                  id={id}
                  ref={setRef}
                  style={style}
                  className={ clsx(styles.container, "glassEffect", className) }
            >
                  <div style={{height: progressorSize, width: progressorSize}} className={styles.svgContainer}>
                        <div className={ styles.wrapper  } style={{ ["--angle" as any] : `${ percent ? 360 * percent : 360 }deg` }} />
                        <svg 
                              width={progressorSize} height={progressorSize } 
                              viewBox={`0 0 ${progressorSize} ${progressorSize}`} className={styles.svg}
                        >
                              <circle
                                    r={r}
                                    fill= "none"
                                    cx={progressorSize / 2}
                                    cy={progressorSize / 2}
                                    strokeWidth={strokeWidth}
                                    stroke="rgba(255, 255, 255, 0.1)"
                              />
                              <circle
                                    r={r}
                                    fill= "none"
                                    strokeLinecap="round"
                                    cx={progressorSize / 2}
                                    cy={progressorSize / 2}
                                    strokeWidth={strokeWidth}
                                    className={styles.progressor}
                                    stroke={backlight || "white"}
                                    style={{ ["--percent" as any] : percent }}
                              />
                        </svg>
                        <span className={styles.percentText}>{ percent ? formatPercent(percent * 100) : "0" }<sup>%</sup> </span>
                  </div>
                  <div>
                        <span className={styles.text}>{text}</span>
                  </div>
            </div>
      );

};


 
export default RoundStep;