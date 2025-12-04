"use client";

import * as d3 from "d3";
import { useLayoutEffect, useRef } from "react";
import styles from "./style.module.css";

interface PieChartProps {
    dataset: PieChartSegment[];
    type?: "2d" | "3d";
}

export interface PieChartSegment {
    percent: number;
    innerRadius: number;
    outerRadius: number;
    thickness: number;
    colors: {
        front: string;
        back: string;
        left: string;
        right: string;
        side?: string;
        backside?: string;
    };
}


const PieChart: React.FC<PieChartProps> = ({ dataset, type = "3d" }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        const container = containerRef.current;
        if (!container || !dataset?.length) return;

        d3.select(container).selectAll("*").remove();

        const width = container.clientWidth;
        const height = container.clientHeight;
        const radiusLimit = Math.min(width, height) / 2;

        // Max pour le scale global
        const maxOuter = Math.max(...dataset.map(d => d.outerRadius));
        const maxThickness = Math.max(...dataset.map(d => d.thickness));
        const scaleFactor = radiusLimit / (maxOuter + maxThickness);

        const svg = d3
            .select(container)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${width / 2}, ${height / 2})`);

        const polarToCartesian = (radius: number, angle: number): [number, number] => [
            Math.cos(angle - Math.PI / 2) * radius,
            Math.sin(angle - Math.PI / 2) * radius,
        ];

        let index = 1;
        let currentAngle = 0;
        let datasetLenght = dataset.length;
        dataset.forEach((pie, index)=>{
            const thickness = pie.thickness * scaleFactor
            const outerRadius = pie.outerRadius * scaleFactor
            const twinIndex =  adjacentIndices(index) // two index twin (cycle) {0,1,2...n}
            
            //------------------------
            // Draw pie
            //------------------------

        })


    }, [dataset, type]);

    return <div ref={containerRef} className={styles.container}></div>;
};



export default PieChart;



function adjacentIndices(n: number) {
  // Return array of couples f(i) - i from 0 to n
  for (let i = 0; i <= n; i++) {
    if (i === 0) 
      return [n - 1, 1];
    else if (i === n) 
        return[n - 1, 0];
    else 
       return [i - 1, i + 1];
  }
}

