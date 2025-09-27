"use client";

import clsx from "clsx";
import styles from './dashboard.module.css'
import { useContext, useEffect, useRef } from "react";


import RoundStep from "@/ui/roundStep/RoundStep";
import LineChart from "@/ui/charts/lineChart/lineChart"

import { dataset } from "@/utils/mocks/charts";
import {  useAppContext } from "@/contexts/AppContextProvider";
import BarChart from "@/ui/charts/barChart/barChart";
import { users } from "@/utils/mocks/users";
import Image from "next/image";




export default function Home() {


  const cardRefs = useRef<HTMLDivElement[]>([]);
  const { AppTheme } = useAppContext()

  const detailsInfo = useRef([
    { color: "green" , text: "Gain", percent: 0.42 },
    { color: "rgba(129, 25, 25, 0.86)" ,  text: "Loss" , percent: 0.365  },
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
    <div className={styles.container} style={{ background: AppTheme.PLAINBACKGROUND }}>
        <div
            style={{ background: AppTheme.CURVE.background }}
            className= {clsx("glassEffect p-4 ", styles.lineChartContainer)}
            
        >
            {/* <h1 className={styles.curvesTitle}>Tenants' payment status</h1> */}
            <div style={{width: "85%", height: "90%"}}>
                <LineChart
                      dataset={dataset}
                      margin={ {  top: 40, right: 10, bottom: 10, left: 30 } }
                />
            </div>
        </div>

        <div className={clsx(styles.tenantsConatiner, "glassEffect")}>
            {
              users.map((user, index)=> (
                <div key={index} className={clsx(styles.tenantsItems, "")}>
                   <Image
                        className="rounded-[100%]"
                        width={80} height={80} src={user.image} alt=""
                    />
                    <div>
                      <span className={styles.tenantsNames}>{user.name}</span>
                      <div>
                            <span>{user.date.toLocaleDateString("en-US",{  year: "numeric",  month:"long", weekday: "long", day:"numeric" })}</span>
                      </div>
                    </div>
                </div>
              ))
            }
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
              <BarChart />
            </div>
            <div className=" glassEffect w-full h-full">

            </div>
        </div>

    </div>
  );
}
