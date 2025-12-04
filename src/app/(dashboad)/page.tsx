"use client"

import { ArrowRight, ArrowUp, ArrowUpRight, Bath, ChevronSmallRightSvgrepoCom, Cooking, LivingroomSofa, LocationPinSvgrepoCom, OptionsVertical } from "@/components/icons";

import styles from "./style.module.css"
import { BedsPillow } from "@/components/icons";
import clsx from "clsx";
import { useEffect, useState } from "react";
import LineChart from "@/ui/charts/lineChart/lineChart";
import {  lossDataset, monthlyAverageDataset, turnoverDataset, basicsPieChartDataset } from "@/utils/mocks/charts";
import CircularProgressor from "@/ui/progressor/circularProgressor/circularProgressor";
import StatusBadges from "@/ui/statusBadge/statusBadges";
import PieChart from "@/ui/charts/pieChart/pieChart";
import BarChart from "@/ui/charts/barChart/barChart";



const percent = 0.78;
const SCROLL_AMOUNT = 120; // scroll distance in px per click

const DashBoard = () => {

    const [firstSectionFocus, setFirstSectionFocus] = useState("rent")

    useEffect(() => {
        const allPropertyMetaBar = document.querySelectorAll(`.${styles.propertyMetaBar}`);

        allPropertyMetaBar.forEach((propertyMetaBar) => {
            const metaGroup = propertyMetaBar.querySelector(`.${styles.metaGroup}`);
            if (!metaGroup) return;

            const leftArrow = propertyMetaBar.querySelector(`.${styles.leftArrowIndicator}`);
            const rightArrow = propertyMetaBar.querySelector(`.${styles.rigthArrowIndicator}`);

            const updateArrowVisibility = () => {
                if (!leftArrow || !rightArrow) return;
                leftArrow.classList.toggle(styles.breakDisplay, metaGroup.scrollLeft <= 0);
                rightArrow.classList.toggle(
                    styles.breakDisplay,
                    metaGroup.scrollLeft + metaGroup.clientWidth >= metaGroup.scrollWidth
                );
            };

            // Initial arrow visibility
            updateArrowVisibility();

            // Scroll when clicking arrows
            leftArrow?.addEventListener("click", () => {
                metaGroup.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
            });
            rightArrow?.addEventListener("click", () => {
                metaGroup.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });
            });

            // Update arrows on scroll
            metaGroup.addEventListener("scroll", updateArrowVisibility);
            window.addEventListener("resize", updateArrowVisibility);
        });
    }, []);

    return ( 
        <div className={styles.container}>
            
            {/*  First section */}
            <div className={ styles.firstDivision }>

                <div className={styles.optionsSection}>
                    <div 
                        onClick={()=>setFirstSectionFocus('buy')}
                        className={clsx(styles.option, firstSectionFocus === "buy" && styles.activate)}
                    >
                        <span>Buy</span>
                    </div>
                    <div 
                        onClick={()=>setFirstSectionFocus('sell')}
                        className={clsx(styles.option, firstSectionFocus === "sell" && styles.activate)}
                    >
                        <span>Sell</span>
                    </div>
                    <div 
                        onClick={()=>setFirstSectionFocus('rent')}
                        className={clsx(styles.option, firstSectionFocus === "rent" && styles.activate)}
                    >
                        <span>Rent</span>
                    </div>
                </div>

                <div className={styles.itemContainer}>
                    <span className={styles.title}>Rent</span>

                    <div className={styles.itemWrapper}>

                        <div className={styles.item}>

                            <div className={styles.imgContainer}>
                                <img className="" src="/assets/images/estate/29107_721x480.jpg" alt="" />
                            </div>
                            <p className={styles.title}>4 000$ <span className={styles.lightColor}>/month</span></p>
                            <span className={styles.title}>Crystal Springs Mannor</span>
                            <div className={styles.locationContainer}>
                                <LocationPinSvgrepoCom  width={25} height={25} />
                                <span className={styles.lightColor}>Belgravia Heights, London</span>
                            </div>

                            <div className={styles.propertyMetaBar}>
                                <div className={clsx(styles.arrowIndicator, styles.leftArrowIndicator, styles.breakDisplay)}>
                                    <ChevronSmallRightSvgrepoCom className={styles.lightColor}  fill="var(--app-textColor)" height={30} width={30}/>
                                </div>
                                <div className={clsx(styles.arrowIndicator, styles.rigthArrowIndicator)}>
                                    <ChevronSmallRightSvgrepoCom className={styles.lightColor}  fill="var(--app-textColor)" height={30} width={30}/>
                                </div>
                                <div className={clsx(styles.metaGroup, styles.lightColor)}>
                                    <div className={styles.tags}>
                                        <BedsPillow fill="var(--app-textColor)" height={22} width={22}/>
                                        <span
                                            className="text-ellipsis"
                                            style={{["--break-ligne-number" as any] : 1}}    
                                        >
                                            2beds
                                        </span>
                                    </div>
                                    <div className={styles.tags}>
                                        <Bath height={22} width={22}/>
                                        <span 
                                            className="text-ellipsis"
                                            style={{["--break-ligne-number" as any] : 1}}
                                        >
                                            4baths
                                        </span>
                                    </div>
                                    <div className={styles.tags}>
                                        <Cooking fill="var(--app-textColor)" height={22} width={22}/>
                                        <span
                                            className="text-ellipsis"
                                            style={{["--break-ligne-number" as any] : 1}}
                                        >
                                            2kitchen
                                        </span>
                                    </div>
                                    <div className={styles.tags}>
                                        <LivingroomSofa fill="var(--app-textColor)" height={22} width={22}/>
                                        <span
                                            className="text-ellipsis"
                                            style={{["--break-ligne-number" as any] : 1}}
                                        >
                                            1Living room
                                        </span>
                                    </div>

                                </div>
                            </div>

                        </div>

                    </div>

                    <div className={styles.itemWrapper}>

                        <div className={styles.item}>

                            <div className={styles.imgContainer}>
                                <img className="" src="/assets/images/estate/AzRT8xsWDLcIb870djrKFRX11IQf69xPiyIzIO_JKLa4SGWLX6PPCZRsWfg0NBbgrpCJRMCUNIl7RZ3NAZ4jBaLZzFSmsC5KAvmSrAZAmsWMnoBYZUBdccZo3A0UjQ7XfQUXZu18Gc71PI4n6FJEhH_bAY3.jpeg" alt="Silverwood Haven" />
                            </div>
                            <p className={styles.title}>2 450$ <span className={styles.lightColor}>/month</span></p>
                            <span className={styles.title}>Silverwood Haven</span>
                            <div className={styles.locationContainer}>
                                <LocationPinSvgrepoCom  width={25} height={25} />
                                <span className={styles.lightColor}>Whistler, Canada</span>
                            </div>

                            <div className={styles.propertyMetaBar}>
                                <div className={clsx(styles.arrowIndicator, styles.leftArrowIndicator, styles.breakDisplay)}>
                                    <ChevronSmallRightSvgrepoCom className={styles.lightColor}  fill="var(--app-textColor)" height={30} width={30}/>
                                </div>
                                <div className={clsx(styles.arrowIndicator, styles.rigthArrowIndicator)}>
                                    <ChevronSmallRightSvgrepoCom className={styles.lightColor}  fill="var(--app-textColor)" height={30} width={30}/>
                                </div>
                                                                <div className={clsx(styles.metaGroup, styles.lightColor)}>
                                    <div className={styles.tags}>
                                        <BedsPillow fill="var(--app-textColor)" height={22} width={22}/>
                                        <span
                                            className="text-ellipsis"
                                            style={{["--break-ligne-number" as any] : 1}}    
                                        >
                                            2beds
                                        </span>
                                    </div>
                                    <div className={styles.tags}>
                                        <Bath height={22} width={22}/>
                                        <span 
                                            className="text-ellipsis"
                                            style={{["--break-ligne-number" as any] : 1}}
                                        >
                                            4baths
                                        </span>
                                    </div>
                                    <div className={styles.tags}>
                                        <Cooking fill="var(--app-textColor)" height={22} width={22}/>
                                        <span
                                            className="text-ellipsis"
                                            style={{["--break-ligne-number" as any] : 1}}
                                        >
                                            2kitchen
                                        </span>
                                    </div>
                                    <div className={styles.tags}>
                                        <LivingroomSofa fill="var(--app-textColor)" height={22} width={22}/>
                                        <span
                                            className="text-ellipsis"
                                            style={{["--break-ligne-number" as any] : 1}}
                                        >
                                            1Living room
                                        </span>
                                    </div>

                                </div>
                            </div>

                        </div>

                    </div>


                    <div className={styles.itemWrapper}>

                        <div className={styles.item}>

                            <div className={styles.imgContainer}>
                                <img className="" src="/assets/images/estate/484320157.jpg" alt="Villa Mar Azul" />
                            </div>
                            <p className={styles.title}>32 800$ <span className={styles.lightColor}>/year</span></p>
                            <span className={styles.title}>Villa Mar Azul</span>
                            <div className={styles.locationContainer}>
                                <LocationPinSvgrepoCom  width={25} height={25} />
                                <span className={styles.lightColor}>Valparaíso, Chili</span>
                            </div>

                            <div className={styles.propertyMetaBar}>
                                <div className={clsx(styles.arrowIndicator, styles.leftArrowIndicator, styles.breakDisplay)}>
                                    <ChevronSmallRightSvgrepoCom className={styles.lightColor}  fill="var(--app-textColor)" height={30} width={30}/>
                                </div>
                                <div className={clsx(styles.arrowIndicator, styles.rigthArrowIndicator)}>
                                    <ChevronSmallRightSvgrepoCom className={styles.lightColor}  fill="var(--app-textColor)" height={30} width={30}/>
                                </div>
                                                               <div className={clsx(styles.metaGroup, styles.lightColor)}>
                                    <div className={styles.tags}>
                                        <BedsPillow fill="var(--app-textColor)" height={22} width={22}/>
                                        <span
                                            className="text-ellipsis"
                                            style={{["--break-ligne-number" as any] : 1}}    
                                        >
                                            2beds
                                        </span>
                                    </div>
                                    <div className={styles.tags}>
                                        <Bath height={22} width={22}/>
                                        <span 
                                            className="text-ellipsis"
                                            style={{["--break-ligne-number" as any] : 1}}
                                        >
                                            4baths
                                        </span>
                                    </div>
                                    <div className={styles.tags}>
                                        <Cooking fill="var(--app-textColor)" height={22} width={22}/>
                                        <span
                                            className="text-ellipsis"
                                            style={{["--break-ligne-number" as any] : 1}}
                                        >
                                            2kitchen
                                        </span>
                                    </div>
                                    <div className={styles.tags}>
                                        <LivingroomSofa fill="var(--app-textColor)" height={22} width={22}/>
                                        <span
                                            className="text-ellipsis"
                                            style={{["--break-ligne-number" as any] : 1}}
                                        >
                                            1Living room
                                        </span>
                                    </div>

                                </div>
                            </div>

                        </div>

                    </div>

                    

                </div>
            </div>

            <div className={styles.main}>

                <div className={styles.header}>
                    <span className={styles.title} >Total</span>
                    <div className={styles.KPIContainer}>

                        <div className={styles.KPIItem}>
                            <div className={styles.lineChart}>
                                <LineChart
                                    dataset={turnoverDataset}
                                    axisSettings={{axisVisibility: false}}
                                    tickSettings={{ tickVisibility: false}}
                                />
                            </div>
                            <div>
                                <p className={styles.littleTitle}>
                                    Turnover
                                    <span style={{['--color' as any]:"#1E90FF", ['--rsc' as any]: "url(/assets/icons/svg/arrow-up.svg)"}} className={styles.rate}>1.4%</span>
                                </p>
                                <p className={styles.title}>7.1k &nbsp;<span  className={styles.lightColor}>turnover</span></p>
                            </div>
                        </div>

                        <div className={styles.KPIItem}>
                            <div className={styles.lineChart}>
                                <LineChart  
                                    dataset={lossDataset}
                                    axisSettings={{axisVisibility: false}}
                                    tickSettings={{ tickVisibility: false}}
                                />
                            </div>
                            <div>
                                <p className={styles.littleTitle}>
                                    Loss
                                    <span style={{['--color' as any]: "tomato", ['--rsc' as any]: "url(/assets/icons/svg/arrow-down.svg)"}} className={styles.rate}>1.9%</span>
                                </p>
                                <p className={styles.title}>5.2k &nbsp; <span className={styles.lightColor}>Loss</span></p>
                            </div>
                        </div>
                        
                        <div className={styles.KPIItem}>
                            <div className={styles.lineChart}>
                                <LineChart
                                    dataset={monthlyAverageDataset}
                                    axisSettings={{ axisVisibility: false }}
                                    tickSettings={{ tickVisibility: false}}
                                />
                            </div>
                            <div>
                                <p className={styles.littleTitle}>
                                    Month Mean 
                                    <span style={{['--color' as any]:"limegreen", ['--rsc' as any]: "url(/assets/icons/svg/arrow-up.svg)"}} className={styles.rate}>1.9%</span>
                                </p>
                                <p className={styles.title}>1.2k &nbsp;<span className={styles.lightColor}>month mean</span></p>
                            </div>
                        </div>

                    </div>
                </div>

                <div className={ styles.complaintsSection }>

                    <span className={ styles.title }>Complaints</span>
                    <div className={  styles.complaintsCard }>

                        <div className={ styles.metricsWrapper }>

                            <div 
                                className={styles.metricItem}
                                style={{ ['--backgroundColor' as any]:"var(--app-neutralColor)", } }
                            >
                                <ArrowUpRight className={styles.arrowUpRight}/>
                                <span className={clsx(styles.metricLabel, styles.littleTitle)}>Total</span>
                                <span className={clsx(styles.metricValue, styles.title)}>128</span>
                                <div className={styles.details}>
                                    <span  
                                        className={clsx(styles.rate,styles.lightColor)}
                                        style={{ ['--rsc' as any]: "url(/assets/icons/svg/arrow-up.svg)", opacity: 1}}
                                    >
                                            2.0% 
                                    </span>
                                    <span className={styles.lightColor}>Increase from last month</span>
                                </div>
                            </div>

                            <div 
                                className={styles.metricItem}
                                style={{['--color' as any]:"tomato", ["--backgroundColor" as any]: "var(--app-container-primary-color)"}}
                            >
                                <ArrowUpRight className={styles.arrowUpRight}/>                                
                                <span className={clsx(styles.metricLabel, styles.littleTitle)}>Resolved</span>
                                <span className={clsx(styles.metricValue, styles.title)}>97</span>
                                <div className={styles.details}>
                                    <span  
                                        className={clsx(styles.rate,styles.lightColor)}
                                        style={{ ['--rsc' as any]: "url(/assets/icons/svg/arrow-down.svg)",  opacity: 1}}
                                    >
                                        4.2% 
                                    </span>
                                    <span className={styles.lightColor}>Decrease from last month</span>
                                </div>
                            </div>

                            <div
                                className={styles.metricItem}
                                style={{['--color' as any]:"limegreen", ["--backgroundColor" as any]: "var(--app-container-primary-color)"}}
                            >
                                <ArrowUpRight className={styles.arrowUpRight}/>
                                <span className={clsx(styles.metricLabel, styles.littleTitle)}>Pending</span>
                                <span className={clsx(styles.metricValue, styles.title)}>31</span>
                                <div className={styles.details}>
                                    <span  
                                        className={clsx(styles.rate,styles.lightColor)}
                                        style={{ ['--rsc' as any]: "url(/assets/icons/svg/arrow-up.svg)",  opacity: 1 }}
                                    >
                                        3.2% 
                                    </span>
                                    <span className={styles.lightColor}>Increase from last month</span>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className={styles.insightContainer}>
                        <span className={styles.title}>Insight</span>

                        <div style={{["--height" as any]: "7.4rem"}} className={styles.pieChartSection}>
                            <div className={styles.pieChartContainer}>
                                <PieChart  dataset={basicsPieChartDataset}/>
                            </div>
                            <div className={styles.details}>
                                <StatusBadges height="7.4rem">
                                    <span style={{["--color" as any]: "limegreen" }}>Resolved</span>
                                    <span style={{["--color" as any]: "yellow" }}> Pending </span>
                                    <span style={{["--color" as any]: "tomato" }}> Failed  </span>
                                    <span style={{["--color" as any]: "tomato" }}> Rejected </span>
                                    <span style={{["--color" as any]: "blue" }}> In Progress </span>
                                </StatusBadges>
                            </div>
                        </div>

                        <div className={styles.barChartContainer}>
                            <BarChart />
                        </div>

                    </div>

                </div>

            </div>

            <div className={ styles.lastDivision } >
                <div className={ styles.notificationContainer }>
                    <span className={styles.title}>Most recent actions</span>
                    <div className={styles.itemsWrapper}>

                        <div className={styles.item}>
                            <img src="https://randomuser.me/api/portraits/women/31.jpg" alt="" />
                            <div>
                                <p className={styles.desc}>Jackie Monroe<span className={styles.lightColor} style={{ opacity: 1 }}>&nbsp;request permission to change</span>&nbsp;Design system</p>
                                <p className={clsx(styles.metaInfo,styles.lightColor)} style={{ marginTop: 5 }}> Employee <span className={styles.time}>5 min ago</span></p>
                            </div>
                            <OptionsVertical height={20} width={20} fill="var(--app-textColor)" className={styles.optionsVertical} />
                        </div>
                        
                        <div className={styles.item}>
                            <img src= "https://randomuser.me/api/portraits/men/19.jpg" alt="" />
                            <div>
                                <p className={styles.desc}>Maxime Girard<span className={styles.lightColor} style={{ opacity: 1 }}>&nbsp;has added a new employee</span></p>
                                <p className={clsx(styles.metaInfo,styles.lightColor)} style={{ marginTop: 5 }}> Employee <span className={styles.time}>25 min ago</span></p>
                            </div>
                            <OptionsVertical height={20} width={20} fill="var(--app-textColor)" className={styles.optionsVertical} />
                        </div>

                        <div className={styles.item}>
                            <img src="https://randomuser.me/api/portraits/men/7.jpg" alt="" />
                            <div>
                                <p className={styles.desc}>Nicolas Blanc<span className={styles.lightColor} style={{ opacity: 1 }}>&nbsp;added a new lease holder</span></p>
                                <p className={clsx(styles.metaInfo,styles.lightColor)} style={{ marginTop: 5 }}> Employee <span className={styles.time}>5 hours ago</span></p>
                            </div>
                            <OptionsVertical height={20} width={20} fill="var(--app-textColor)" className={styles.optionsVertical} />
                        </div>

                    </div>
                </div>
                
                <div className={ styles.calendarContainer } > 
                    {/* <span>calendar</span>
                    <div>calendar...</div> */}
                </div>

            </div>

        </div>
    );
}


export default DashBoard;






// "use client"

// import clsx from "clsx";
// import Image from "next/image";
// import React, {  useEffect, useRef, useState  } from 'react'

// import { useAppContext } from '@/contexts/AppContextProvider'
// import { AppThemeType } from "@/utils/appThemes";

// import { dataset } from '@/utils/mocks/charts'
// import { usersData } from "@/utils/mocks/users";


// import LineChart, { onChartReadyFuncProps } from '@/ui/charts/lineChart/lineChart'
// import CircularProgressor, { CircularProgressorProps } from '@/ui/progressor/circularProgressor/circularProgressor'



// import ProfileSVGLogo from "@/assets/icons/svg/white/profile-users-group-silhouette-svgrepo-com.svg"
// import ContactSVGLogo from "@/assets/icons/svg/white/contact-svgrepo-com.svg"
// import StatusSVGLogo from "@/assets/icons/svg/white/status-svgrepo-com.svg"
// import PaidSVGLogo from "@/assets/icons/svg/white/paid-svgrepo-com.svg"
// import UnpaidSVGLogo from "@/assets/icons/svg/white/unpaid-svgrepo-com.svg"
// import EmailSVGLogo from "@/assets/icons/svg/white/email-9-svgrepo-com.svg"
// import CountdownSVGLogo from "@/assets/icons/svg/white/countdown-svgrepo-com.svg"
// import PhoneSVGLogo from "@/assets/icons/svg/white/phone-svgrepo-com.svg"


// import styles from './style.module.css'






// interface DashBoardProps{
// }



// const DashBoard: React.FC<DashBoardProps>  = ({ })=>{
    
//     const { AppTheme } = useAppContext()
//     const lineChartItems =  useRef<onChartReadyFuncProps | null>(null)            // Retrieve from the line chart component and represents a group composed of the x-axis, dot information, and line charts.
//     const lineChartContainerRef = useRef<HTMLDivElement | null>(null)
//     const [activeTableDisplayMode, setActiveTableDisplayMode] = useState<string>("tbl")
    
//     const [users, setUsers] = useState(usersData)

//     useEffect(() => {
//         const container = lineChartContainerRef.current;
//         const chatItems = lineChartItems.current;

//         if (!container || !chatItems) return;

//         //dragable line chart effect

//         let isDragging = false;
//         let startX = 0;
//         let currentOffset = 0;

//         const maxXOffset = Math.max(0, chatItems.divContainer.clientWidth - container.clientWidth );

//         currentOffset = -maxXOffset;
//         chatItems.chartsGridX.attr("transform", `translate(${currentOffset}, 0)`);

// 	    chatItems.yAxisGroup.selectAll('.tick text')
//                             .attr("x", container.clientWidth -10  )
//                             .attr("dy", -5 )

//         const handleMouseDown = (e: MouseEvent) => {
//             isDragging = true;
//             startX = e.clientX;
//             document.body.style.userSelect = "none";
//         };

//         const handleMouseMove = (e: MouseEvent) => {
//             if (!isDragging) return;

//             const dx = e.clientX - startX;
//             let newOffset = currentOffset + dx;

//             newOffset = Math.max(-maxXOffset, Math.min(0, newOffset));

//             chatItems.chartsGridX.attr("transform", `translate(${newOffset + 7.5 }, 0)`);
//         };

//         const handleMouseUp = (e: MouseEvent) => {
//             if (!isDragging) return;
//             isDragging = false;

//             const dx = e.clientX - startX;
//             currentOffset = Math.max(-maxXOffset, Math.min(0, currentOffset + dx));

//             document.body.style.userSelect = "";
//         };

//         container.addEventListener("mousedown", handleMouseDown);
//         window.addEventListener("mousemove", handleMouseMove);
//         window.addEventListener("mouseup", handleMouseUp);

//         return () => {
//             container.removeEventListener("mousedown", handleMouseDown);
//             window.removeEventListener("mousemove", handleMouseMove);
//             window.removeEventListener("mouseup", handleMouseUp);
//         };
//     }, []);


//     return(
//         <div>

//         </div>

//                         // <div className={styles.lineChart}>
//                         //     <LineChart
//                         //         appTheme={AppTheme}
//                         //         dataset={dataset}
//                         //         margin={{
//                         //             top: 5,  bottom: 25
//                         //         }}
//                         //         onChartReady={({divContainer, chartsGridX, svg, xAxisGroup, yAxisGroup})=>{
//                         //             lineChartItems.current = {svg, yAxisGroup, xAxisGroup ,chartsGridX, divContainer}
//                         //         }}
//                         //     />
//                         // </div>
//     )
// }

// export default DashBoard









// interface FluxPointProps{
//     price: string;
//     percent: number;
//     signalText: string;
//     signalColor: string;
//     appTheme: AppThemeType;
//     edgeColorSettings?: NonNullable<CircularProgressorProps['edgeSettings']>['color']
// }





// const FluxPoint: React.FC<FluxPointProps> = ({appTheme, price, signalColor, signalText, percent, edgeColorSettings}) => {
//     return ( 
//             <div 
//                 className={styles.InsightBox}
//                 style={{ ["--signal-text-color" as any]: signalColor }}
//             >
//                 <CircularProgressor
//                     size={"40px"}
//                     percent={percent}
//                     fontSize={ "15px" }
//                     edgeSettings={{ 
//                         padChord: 1,
//                         length: "10px",
//                         color: edgeColorSettings || { 
//                             active: appTheme.TEXTCOLOR,
//                             innactive: appTheme.SIDEBAR.BACKGROUNDCOLOR
//                         },
//                     }}
//                     containerCssProperties={{ gap: 30 }}
//                 />
//                 <div className={styles.statTxtBox}>
//                     <span>$ {price}</span>
//                     <div>
//                         <div className={styles.signalPoint}/>
//                             <span className={styles.signalText}>{signalText}</span>
//                         </div>
//                     </div>
//             </div>
//      );
// }






// interface UserTableProps{
//     users: any[]
// }
 



// const UserTable: React.FC<UserTableProps> = ({users}) => {
//     const [isAllUsersSelected, setIsAllUsersSelected] = useState<boolean>(false);
//     return ( 
//                 <div className={styles.tableContainer}>

//                         <table>
//                             <thead>
//                                     <tr>
//                                         <th 
//                                             id={styles.selectColumTitle}
//                                         >
//                                             <input  
//                                                 type="checkbox"
//                                                 onChange={(event)=>{
//                                                     console.log(event.target.checked)
//                                                     setIsAllUsersSelected(event.target.checked)
//                                                 }}
//                                             />
//                                         </th>

//                                         <th>
//                                             <div>
//                                                 <Image 
//                                                     alt="Icon"
//                                                     src={ProfileSVGLogo}
//                                                     className="icon-small-size"
//                                                 />
//                                                 <span>Profile</span>
//                                             </div>
//                                         </th>

//                                         <th>
//                                             <div>
//                                                 <Image 
//                                                     alt="Icon"
//                                                     src={ContactSVGLogo}
//                                                     className="icon-small-size"
//                                                 />
//                                                 <span>Contact</span>
//                                             </div>
//                                         </th>

//                                         <th>
//                                             <div>
//                                                 <Image 
//                                                     alt="Icon"
//                                                     src={StatusSVGLogo}
//                                                     className="icon-small-size"
//                                                 />
//                                                 <span>Status</span>
//                                             </div>
//                                         </th>
                                        
//                                         <th>
//                                             <div>
//                                                 <Image 
//                                                     alt="Icon"
//                                                     src={PaidSVGLogo}
//                                                     className="icon-small-size"
//                                                 />
//                                                 <span>Paid</span>
//                                             </div>
//                                         </th>
                                        
//                                         <th>
//                                             <div>
//                                                 <Image 
//                                                     alt="Icon"
//                                                     src={UnpaidSVGLogo}
//                                                     className="icon-small-size"
//                                                 />
//                                                 <span>Unpaid</span>
//                                             </div>
//                                         </th>

//                                     </tr>
//                             </thead>
//                             <tbody>
//                                 {    users ?
//                                         users.map((user, key)=>
//                                         (   <tr key={key}>

//                                                 <td>
//                                                     <div>
//                                                         <input 
//                                                             type="checkbox"
//                                                             checked={isAllUsersSelected}
//                                                             onChange={(event)=>{
//                                                             }}
//                                                         />
//                                                     </div>
//                                                 </td>
                                                
//                                                 <td className={styles.profile}>
//                                                     <div>
//                                                         <img className={styles.image} src={user.image} alt="" />
//                                                         <div className={styles.details}>
//                                                             <span>{user.name} </span>
//                                                             <div>
//                                                                 <Image 
//                                                                     alt="icon"
//                                                                     src={CountdownSVGLogo} 
//                                                                     className={styles.img}
//                                                                 />
//                                                                 <span>Today at 12h</span>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </td>

//                                                 <td className={styles.contact}>
//                                                     <div>
//                                                         <div>
//                                                         <Image 
//                                                                 alt="icon"
//                                                                 src={EmailSVGLogo}
//                                                                 width={20} height={20} 
//                                                                 className="icon-object-properties"
//                                                             /> 
//                                                             <span>{user.email}</span>
//                                                         </div>
//                                                         <div>
//                                                             <Image 
//                                                                 alt="icon"
//                                                                 src={PhoneSVGLogo}
//                                                                 width={20} height={20} 
//                                                                 className="icon-object-properties"
//                                                             /> 
//                                                             <span>{user.contact}</span>
//                                                         </div>
//                                                     </div>
//                                                 </td>

//                                                 <td className={styles.status}>
//                                                     <div
//                                                         className={styles.statusCover}
//                                                         style={{
//                                                             ["--signal-text-color" as any]: 
//                                                                                 user.status === "accepted" ? 
//                                                                                         "green" 
//                                                                                         : user.status === "pending" ? 
//                                                                                             "yellow" 
//                                                                                             : user.status === "cancel" ? 
//                                                                                                 "red" 
//                                                                                                 : user.status === "scheduled" ? 
//                                                                                                     "blue" 
//                                                                                                     : ""
//                                                         }}
//                                                     >
//                                                         <div>
//                                                             <div className={styles.signalPoint}/>
//                                                             <span>{user.status[0].toUpperCase() + user.status.substring(1)}</span>
//                                                         </div>
//                                                     </div>
//                                                 </td>

//                                                 <td>
//                                                     <span>$ {user.paid}</span>
//                                                 </td>

//                                                 <td>
//                                                     <span>$ {user.unpaid}</span>
//                                                 </td>
//                                             </tr>
//                                         )
//                                         ) : 
//                                         <></>
//                                 }

//                             </tbody>
//                         </table>

//                    </div>
//      );
// }
 
