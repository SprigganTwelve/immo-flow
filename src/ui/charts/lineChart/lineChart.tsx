"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import styles from "./lineChart.module.css";
import { useAppContext } from "@/contexts/AppContextProvider";



export interface LineChartPops {
    margin: Readonly<{
         top: number, right: number, bottom: number, left: number
    }>,
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
    dataset
}) => {
            
        const { AppTheme } = useAppContext()
        const divContainer = useRef<HTMLDivElement>(null);

        const today = new Date();

        useEffect(() => {

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
                .range([margin.left, width - margin.right]);


            const yScale = d3
                .scaleLinear()
                .domain([0, dataset.maximumPrice ])
                .range([height - margin.bottom, margin.top]);

            // axes


            const xAxis = d3
                .axisBottom(xScale)
                .tickValues(Array.from({ length: 12}, (_,i) => new Date(today.getFullYear(), i + 1 , 0 )))
                .tickFormat(d =>  d3.timeFormat("%b")(d as Date))
                .tickSizeOuter(0);

            const yAxis = d3
                .axisLeft(yScale)
                .ticks(5)
                .tickSizeOuter(0)
                .tickFormat((d) => `${((d as number) / 1000).toLocaleString()}k`);
            
            


            svg
                .append("g")
                .attr("transform", `translate(0, ${height - margin.bottom})`)
                .call(xAxis)
                .selectAll("text")
                .attr("fill", "#f8fafc")
                .style("font-size", "12px");

            svg
                .append("g")
                .attr("transform", `translate(${margin.left},0)`)
                .call(yAxis)
                .selectAll("text")
                .attr("fill", "#f8fafc")
                .style("font-size", "12px");

            svg.selectAll(".domain, .tick line").attr("stroke", AppTheme.CURVE.axes );
            svg.selectAll(".tick").filter( t => t === 0 ).remove()


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

            // adding gradient


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


            svg
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

            svg
                .append("path")
                .datum(paidData)
                .attr("fill", "none")
                .attr("stroke", "limegreen")
                .attr("stroke-width", 3)
                .attr("d", linePaid);


            svg
                .append("path")
                .datum(unpaidData)
                .attr("fill", "none")
                .attr("stroke", "tomato")
                .attr("stroke-width", 3)
                .attr("d", lineUnpaid);

            // add interactive points

            svg
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

            svg
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
                    ;
        }, []);

        return <div ref={divContainer} className={styles.container}></div>;
};

export default LineChart;
