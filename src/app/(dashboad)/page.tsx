"use client";

import clsx from "clsx";
import styles from './dashboard.module.css'
import { useEffect, useRef } from "react";


import RoundStep from "@/ui/roundStep/RoundStep";
import LineChart from "@/ui/lineChart/lineChart"


export default function Home() {


  const cardRefs = useRef<HTMLDivElement[]>([]);

  const detailsInfo = useRef([
    { color: "green" , text: "Gain", percent: 0.42 },
    { color: "rgba(129, 25, 25, 0.86)" ,  text: "Loss" , percent: 0  },
    { color: "rgba(179, 114, 114, 0.945)", text: "Rent" , percent: 1 },
    { color: "rgba(111, 57, 212, 0.904)" , text: "Vacancy rate", percent: 0.6565 }
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
            className="glassEffect p-4 "
        >
              <LineChart />
        </div>

        <div className={clsx(styles.tenants, "glassEffect")}>
              {/* Here will be shown the tenants */}
        </div>

        <div id="details" className={styles.detailContainer}>
          {
            detailsInfo.current.map((item, i )=>(
              <RoundStep 
                  key={i}
                  text={item.text}
                  percent={ item.percent }
                  setRef={setCardRef(i) }
                  className={styles.card } 
                  style={{["--backlight" as any] : item.color}}
              />
            ))
          }
        </div>

        <div className="flex justify-between gap-4">
            <div className=" glassEffect w-full h-full">
              {/* moyenne des paiement */}
            </div>
            <div className=" glassEffect w-full h-full"></div>
        </div>

    </div>
  );
}
