"use client";

import {  useLayoutEffect, useRef } from "react";
import * as d3 from "d3";
import styles from "./lineChart.module.css";
import { AppThemeType } from "@/utils/appThemes";


export interface onChartReadyFuncProps{
        divContainer: HTMLDivElement;
        svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
        chartsGridX: d3.Selection<SVGGElement, unknown, null, undefined>;
        yAxisGroup: d3.Selection<SVGGElement, unknown, null, undefined>;
        xAxisGroup: d3.Selection<SVGGElement, unknown, null, undefined>;
}

export interface LineChartPops {
    onChartReady?: ({
        svg,
        xAxisGroup,
        yAxisGroup,
        chartsGridX,
        divContainer,
    }:onChartReadyFuncProps) => void;

    margin?: Readonly<{
         top?: number, right?: number, bottom?: number, left?: number
    }>,

    appTheme?: AppThemeType,

    dataset: Readonly<{
        dates: Date[],
        paid: {
            prices: number[]
        },
        unpaid: {
            prices: number[]
        },
        maximumPrice: number
    }>

}



const LineChart : React.FC<LineChartPops> = ({
    margin,
    dataset,
    appTheme,
    onChartReady
}) => {
            
        const divContainer = useRef<HTMLDivElement>(null);

        const today = new Date();

        useLayoutEffect(() => {

            if (!divContainer.current) return;

            const { width, height } = divContainer.current.getBoundingClientRect();

            const svg = d3
                .select(divContainer.current)
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                .style("overflow", "visible")


            // scales

            const xScale = d3
                .scaleTime()
                .domain([
                    new Date(today.getFullYear(), 0, 1), 
                    new Date(today.getFullYear() + 1 , 0, 7)
                ])
                .range([(margin?.left ||0) ||0, width - (margin?.right ?? 0)]);


            const yScale = d3
                .scaleLinear()
                .domain([0, dataset.maximumPrice ])
                .range([height - (margin?.bottom ||0), (margin?.top || 0)]);

                
            // axes
            
                // === Y-Axis ===

            const yAxis = d3
                .axisLeft(yScale)
                .ticks(5)
                .tickSizeOuter(0)
                .tickFormat((d) => d3.format("~s")(d as number));
            

            const yAxisGroup = svg
                .append("g")
                .attr("class", "y-axis")
                .attr("transform", `translate(${margin?.left || 0}, 0)`)
                .call(yAxis);

            yAxisGroup.select(".domain")
                        .remove()
            

            yAxisGroup.selectAll("line")
                .attr("x2", width - (margin?.left || 0))
                .attr("stroke-dasharray", "4 4")        
                .attr("stroke", appTheme?.CURVE?.axes?.stroke || "#444")
                .attr("stroke-width", 1)
                .attr("opacity", 0.8); 

            yAxisGroup.selectAll("text")
                .attr("x", -10) 
                .attr("dy", 4)
                .attr("text-anchor", "end")
                .attr("fill", appTheme?.CURVE?.axes?.fill || "#f8fafc")
                .style("font-size", "12px");

            

            // Filters
            
            svg.selectAll(".tick").filter( t => t === 0 ).remove()
                        
            // Custom group


            const chartsGridX = svg.append("g")

                
                // == X- axis ==

            const xAxis = d3
                .axisBottom(xScale)
                .tickValues(Array.from({ length: 12}, (_,i) => new Date(today.getFullYear(), i + 1 , 0 )))
                .tickFormat(d =>  d3.timeFormat("%b")(d as Date))
                .tickSizeOuter(0);
            
            

            const xAxisGroup = chartsGridX
                                .append("g")
                                .attr("class", "x-axis")
                                .attr("transform", `translate(0, ${height - (margin?.bottom || 0)})`)
                                .call(xAxis);
            
            xAxisGroup.selectAll("text")
                        .attr("fill", appTheme?.CURVE?.axes?.fill || "#f8fafc")
                        .style("font-size", "12px");

            xAxisGroup.selectAll(".domain, .tick line")
                        .attr("stroke", appTheme?.CURVE?.axes?.stroke || "#f8fafc")
                        .attr("stroke-width", appTheme?.CURVE?.axes?.strokeWidth || 1);



            // line generators

            const linePaid = d3
                .line<{ x: Date; y: number }>()
                .x(d => xScale(d.x))
                .y(d => yScale(d.y))
                .curve(d3.curveCatmullRom.alpha(0.5)); // smoothing

            const lineUnpaid = d3
                .line<{ x: Date; y: number }>()
                .x(d => xScale(d.x))
                .y(d => yScale(d.y))
                .curve(d3.curveCatmullRom.alpha(0.5));

            const paidData = dataset.dates.map((d, i) => ({ x: d, y: dataset.paid.prices[i] }));
            const unpaidData = dataset.dates.map((d, i) => ({ x: d, y: dataset.unpaid.prices[i] }));

            // Adding gradient


            const defs = svg.append("defs");
            const gradientPaid = defs
                .append("linearGradient")
                .attr("id", "gradient-paid")
                .attr("x1", "0%")
                .attr("y1", "0%")
                .attr("x2", "0%")
                .attr("y2", "100%");

            gradientPaid.append("stop").attr("offset", "0%").attr("stop-color", "green").attr("stop-opacity", 0.4);
            gradientPaid.append("stop").attr("offset", "100%").attr("stop-color", "green").attr("stop-opacity", 0);


            // space under the curve


            chartsGridX
                .append("path")
                .datum(paidData)
                .attr("fill", "url(#gradient-paid)")
                .attr("stroke", "none")
                .attr("d", d3.area<{ x: Date; y: number }>()
                    .x(d => xScale(d.x))
                    .y0(yScale(0))
                    .y1(d => yScale(d.y))
                    .curve(d3.curveCatmullRom.alpha(0.5))
                );

            // draw curves

            chartsGridX
                        .append("path")
                        .datum(paidData)
                        .attr("fill", "none")
                        .attr("stroke", "limegreen")
                        .attr("stroke-width", 3)
                        .attr("d", linePaid);


            chartsGridX
                        .append("path")
                        .datum(unpaidData)
                        .attr("fill", "none")
                        .attr("stroke", "tomato")
                        .attr("stroke-width", 3)
                        .attr("d", lineUnpaid);

            // add interactive points

            chartsGridX
                    .selectAll(".dot-paid")
                    .data(paidData)
                    .enter()
                    .append("circle")
                    .attr("class", "dot-paid")
                    .attr("cx", d => xScale(d.x))
                    .attr("cy", d => yScale(d.y))
                    .attr("r", 7)
                    .attr("fill", "limegreen")
                    .attr("stroke", "#fff")
                    .attr("stroke-width", 1)
                    .style("cursor", "pointer")
                    .on("mouseover", (event, d) => {
                        d3.select(event.currentTarget).transition().attr("r", 9);
                    })
                    .on("mouseout", (event, d) => {
                        d3.select(event.currentTarget).transition().attr("r", 7);
                    });

            chartsGridX
                        .selectAll(".dot-unpaid")
                        .data(unpaidData)
                        .enter()
                        .append("circle")
                        .attr("class", "dot-unpaid")
                        .attr("cx", d => xScale(d.x))
                        .attr("cy", d => yScale(d.y))
                        .attr("r", 7)
                        .attr("fill", "tomato")
                        .attr("stroke", "#fff")
                        .attr("stroke-width", 1)
                        .style("cursor", "pointer")
                        .on("mouseover", (event, d) => {
                                d3.select(event.currentTarget).transition().attr("r", 9);
                        })
                        .on("mouseout", (event, d) => {
                            d3.select(event.currentTarget).transition().attr("r", 7);
                        });
            


            if(onChartReady)
                onChartReady({ svg, chartsGridX, divContainer: divContainer.current, xAxisGroup, yAxisGroup })

        }, [appTheme, margin, onChartReady, dataset]);

        return <div ref={divContainer} className={styles.container}></div>;
};

export default LineChart;
