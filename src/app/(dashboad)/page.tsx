
"use client"

import * as d3 from "d3";
import clsx from "clsx";

import Image from "next/image";
import React, {  useEffect, useRef, useState  } from 'react'
import { useAppContext } from '@/contexts/AppContextProvider'

import { dataset } from '@/utils/mocks/charts'
import { AppThemeType } from "@/utils/appThemes";

import LineChart, { onChartReadyFuncProps } from '@/ui/charts/lineChart/lineChart'
import CircularProgressor, { CircularProgressorProps } from '@/ui/progressor/circularProgressor/circularProgressor'


import SVGVerticalLayout from "@/assets/icons/svg/white/layout-6-svgrepo-com.svg"
import SVGTablLayout from "@/assets/icons/svg/white/layout6-svgrepo-com.svg"
import SVGSearch from "@/assets/icons/svg/white/search-svgrepo-com (1).svg"
import SettingsSVGLogo from "@/assets/icons/svg/white/settings.svg"

import styles from './style.module.css'
import { users } from "@/utils/mocks/users";



interface DashBoardProps{
}


const tickLabelOffsetY = 20

const DashBoard: React.FC<DashBoardProps>  = ({ })=>{
    
    const { AppTheme } = useAppContext()
    const lineChartItems =  useRef<onChartReadyFuncProps | null>(null)            // Retrieve from the line chart component and represents a group composed of the x-axis, dot information, and line charts.
    const lineChartContainerRef = useRef<HTMLDivElement | null>(null)
    const [activeTableDisplayMode, setActiveTableDisplayMode] = useState<string>("tbl")

    useEffect(() => {
        const container = lineChartContainerRef.current;
        const chatItems = lineChartItems.current;
        if (!container || !chatItems) return;

        let isDragging = false;
        let startX = 0;
        let currentOffset = 0;

        const maxXOffset = Math.max(0, chatItems.divContainer.clientWidth - container.clientWidth );

        currentOffset = -maxXOffset;
        chatItems.chartsGridX.attr("transform", `translate(${currentOffset}, 0)`);

	    chatItems.yAxisGroup.selectAll('.tick text')
                            .attr("x", container.clientWidth -10  )
                            .attr("dy", -5 )

        const handleMouseDown = (e: MouseEvent) => {
            isDragging = true;
            startX = e.clientX;
            document.body.style.userSelect = "none";
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging) return;

            const dx = e.clientX - startX;
            let newOffset = currentOffset + dx;

            console.log(newOffset)
            newOffset = Math.max(-maxXOffset, Math.min(0, newOffset));

            chatItems.chartsGridX.attr("transform", `translate(${newOffset + 7.5 }, 0)`);
        };

        const handleMouseUp = (e: MouseEvent) => {
            if (!isDragging) return;
            isDragging = false;

            const dx = e.clientX - startX;
            currentOffset = Math.max(-maxXOffset, Math.min(0, currentOffset + dx));

            document.body.style.userSelect = "";
        };

        container.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            container.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, []);


    return(
        <div 
            className={styles.container}
        >
            <div>

                <div className={styles.left}>
                    <div className={styles.flowMetrics}>
                        <FluxPoint 
                            price='32.1k'
                            percent={.45}
                            appTheme={AppTheme}
                            signalColor='green'
                            signalText='Approved'
                        />
                        <FluxPoint 
                            price='12.4k'
                            percent={.25}
                            appTheme={AppTheme}
                            signalColor='yellow'
                            signalText='Pending'
                        />
                        <FluxPoint 
                            price='59.4k'
                            percent={.79}
                            appTheme={AppTheme}
                            signalColor='red'
                            signalText='Cancel'
                        />
                        <FluxPoint 
                            price='14.87k'
                            percent={.26}
                            appTheme={AppTheme}
                            signalColor='blue'
                            signalText='Sheduled'
                        />
                    </div>
                    <div
                        ref={lineChartContainerRef} 
                        className={styles.lineChartContainer}
                    >
                        <div className={styles.lineChart}>
                            <LineChart
                                appTheme={AppTheme}
                                dataset={dataset}
                                margin={{
                                    top: 5,  bottom: 25
                                }}
                                onChartReady={({divContainer, chartsGridX, svg, xAxisGroup, yAxisGroup})=>{
                                    lineChartItems.current = {svg, yAxisGroup, xAxisGroup ,chartsGridX, divContainer}
                                }}
                            />
                        </div>

                    </div>
                    <Image 
                            alt="settings"
                            src={SettingsSVGLogo}
                            height={25} width={25}
                            className= {clsx("icon-object-properties", styles.curveSettingsIon)}
                    />
                </div>

                <div className={styles.right}>

                    <div className={styles.title}>
                        <p>
                            <span>Renting</span>&nbsp;
                            <span>record</span>
                        </p>
                    </div>

                    <div className={styles.optionsSection}>
                        <div>
                            <input type="text" placeholder="Search"/>
                            <Image 
                                    alt="vtl"
                                    src={SVGSearch}
                                    height={30} width={30}
                                    className= {clsx("icon-object-properties", styles.searchIcon)}
                            />
                        </div>
                        <div className={styles.icons}>
                                <Image 
                                    alt="vtl"
                                    height={30} width={30}
                                    src={SVGVerticalLayout}
                                    onClick={()=> setActiveTableDisplayMode("vtl")}
                                    className= {clsx("icon-object-properties", activeTableDisplayMode === "vtl" && "icon-active")}
                                />
                                <Image 
                                    alt="tbl"
                                    height={30} width={30}
                                    src={SVGTablLayout}
                                    onClick={()=> setActiveTableDisplayMode("tbl")}
                                    className= {clsx("icon-object-properties", activeTableDisplayMode === "tbl" && "icon-active")}
                                />
                        </div>
                    </div>

                   <div className={styles.tableContainer}>

                        <table>
                            <thead>
                                    <tr>
                                        <th 
                                            id={styles.selectColumTitle}
                                        />
                                        <th></th>
                                        <th>Name</th>
                                        <th>contact</th>
                                        <th>status</th>
                                        <th>paid</th>
                                        <th>unpaid</th>
                                    </tr>
                            </thead>
                            <tbody>
                                {    users ?
                                        users.map((user)=>
                                        <tr>
                                            <td>
                                                <input type="checkbox" />
                                            </td>
                                            <td>
                                                <img className={styles.image} src={user.image} alt="" />
                                            </td>
                                            <td>
                                                <span>{user.name}</span>
                                            </td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        ) : 
                                        <></>
                                }

                            </tbody>
                        </table>

                   </div>

                </div>

            </div>
        </div>
    )
}

export default DashBoard






interface FluxPointProps{
    price: string;
    percent: number;
    signalText: string;
    signalColor: string;
    appTheme: AppThemeType;
    edgeColorSettings?: NonNullable<CircularProgressorProps['edgeSettings']>['color']
}

const FluxPoint: React.FC<FluxPointProps> = ({appTheme, price, signalColor, signalText, percent, edgeColorSettings}) => {
    return ( 
            <div 
                className={styles.InsightBox}
                style={{ ["--signal-text-color" as any]: signalColor }}
            >
                <CircularProgressor
                    size={"40px"}
                    percent={percent}
                    fontSize={ "15px" }
                    edgeSettings={{ 
                        padChord: 1,
                        length: "10px",
                        color: edgeColorSettings || { 
                            active: appTheme.TEXTCOLOR,
                            innactive: appTheme.SIDEBAR.BACKGROUNDCOLOR
                        },
                    }}
                    containerCssProperties={{ gap: 30 }}
                />
                <div className={styles.statTxtBox}>
                    <span>$ {price}</span>
                    <div>
                        <div className={styles.signalPoint}/>
                            <span className={styles.signalText}>{signalText}</span>
                        </div>
                    </div>
            </div>
     );
}
 