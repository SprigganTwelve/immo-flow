"use client"

import { useEffect, useRef } from 'react';
import * as d3 from "d3";

import styles from './lineChart.module.css'


const LineChart = () => {

    const divContainer = useRef<HTMLDivElement>(null);

    const dataset = {
        dates: Array.from({ length: 12 }, (_, i) => new Date(2025, i, 28)),
        paid: {
            prices: [50000, 60000, 58000, 62000, 70000, 65000, 68000, 72000, 75000, 73000, 77000, 80000]
        },
        unpaid: {
            prices: [10000, 12000, 15000, 13000, 11000, 14000, 16000, 15000, 17000, 18000, 19000, 20000]
        },
        maximumPrice: 100000
    }

    useEffect(() => {
        if (!divContainer.current) return;

    }, [])
    
    return ( 
        <div 
            id='chart-container'
            ref={divContainer}
            className={styles.container}
        >    
        </div>
     );
}
 
export default LineChart;