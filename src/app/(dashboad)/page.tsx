"use client";

import clsx from "clsx";
import styles from './dashboard.module.css'
import RoundStep from "@/ui/roundStep/RoundStep";
import { useEffect, useRef } from "react";


export default function Home() {


  const cardRefs = useRef<HTMLDivElement[]>([]);

  const backlights = useRef([
    "purple",
    "rgba(129, 25, 25, 0.356)",
    "rgba(179, 114, 114, 0.945)",
    "rgba(111, 57, 212, 0.904)"
  ]);

  useEffect(() => {
      cardRefs.current.forEach((card, i) => {
        card.onmousemove = (e)=>{
          let x = e.pageX - card.offsetLeft;
          let y = e.pageY- card.offsetTop;
          card.style.setProperty('--x', x + 'px');
          card.style.setProperty('--y', y + 'px');
        }
      });
  }, []);


  const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
    if (el) cardRefs.current[index] = el;
  };

  return (
    <div className={styles.container}>
      
        <div
            className="glassEffect curves"
        >
              
        </div>

        <div className={clsx(styles.tenants, "glassEffect")}>

        </div>

        <div id="details" className={styles.detailContainer}>
          {
            backlights.current.map((color, i )=>(
              <RoundStep 
                  key={i}
                  setRef={setCardRef(i)}
                  className={styles.card} 
                  style={{["--backlight" as any] : color }}
              />
            ))
          }
        </div>

        <div className="flex justify-between gap-4">
            <div className=" glassEffect w-full h-full"></div>
            <div className=" glassEffect w-full h-full"></div>
        </div>

    </div>
  );
}
