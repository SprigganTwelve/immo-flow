"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import styles from "./lineChart.module.css";

const LineChart = () => {

  const divContainer = useRef<HTMLDivElement>(null);

  const today = new Date()

  const dataset = {
        dates: Array.from({ length: 12 }, (_, i) => new Date(today.getFullYear(), i +1 , 0)),
        paid: {
            prices: [
            40000, // janvier, bas après vacances
            55000, // février, léger pic
            70000, // mars, forte hausse
            85000, // avril, pic de saison
            90000, // mai, plateau
            75000, // juin, chute
            60000, // juillet, creux estival
            65000, // août, reprise
            80000, // septembre, forte hausse
            95000, // octobre, pic max
            88000, // novembre, léger recul
            70000, // décembre, chute
            ],
        },
        unpaid: {
            prices: [
            5000,   // janvier, faible impayé
            10000,  // février, hausse
            15000,  // mars, encore plus
            20000,  // avril, pic
            18000,  // mai, léger recul
            25000,  // juin, fort rebond
            30000,  // juillet, creux inversé
            20000,  // août, baisse
            15000,  // septembre, chute
            10000,  // octobre, bas
            5000,   // novembre, minimum
            12000,  // décembre, léger rebond
            ],
        },
        maximumPrice: 100000, // augmenter pour inclure le pic
   };


  useEffect(() => {

        if (!divContainer.current) return;

        //container


        const { width, height } = divContainer.current.getBoundingClientRect();

        const margin = { top: 20, right: 20, bottom: 30, left: 50 };


        //svg


        const svg = d3
                    .select(divContainer.current)
                    .append("svg")
                    .attr("width", width + 5 )
                    .attr("height", height +5 )
                    .style("overflow", "visible");


        // scales and padding


        const y_scale = d3
                    .scaleLinear()
                    .domain([0, dataset.maximumPrice])
                    .range([height - margin.bottom, margin.top]); 


        const x_scale = d3
                        .scaleTime()
                        .domain([dataset.dates[0], dataset.dates[dataset.dates.length - 1]])
                        .range([margin.left, width - margin.right]);



        // axes



        const x_axis_builder = d3
                                .axisBottom(x_scale)
                                    .tickValues(dataset.dates)
                                    .tickFormat(d => d3.timeFormat("%b")(d as Date));

        

        const y_axis_builder = d3.axisLeft(y_scale);


        svg.append("g")
            .attr("transform", `translate(0, ${height - margin.bottom})`) 
            .call(x_axis_builder)
            .attr("fill", "white");



        svg.append("g")
            .attr("transform", `translate(${margin.left},0)`) 
            .call(y_axis_builder);

                svg.selectAll(".domain")
            .attr("stroke-width", 1)
            .attr("stroke", "white");

        //  preparing points


        const paidData = dataset.dates.map((date, i) => ({
            x: date,
            y: dataset.paid.prices[i],
        }));


        const unpaidData = dataset.dates.map((date, i) => ({
            x: date,
            y: dataset.unpaid.prices[i],
        }));


        // line generator


        const line = d3
            .line<{ x: Date; y: number }>()
            .x( (d) => x_scale(d.x)!  )
            .y( (d) => y_scale(d.y)   )
            .curve(d3.curveMonotoneX);

        // draw lines


        const paidCurves = svg.append("path")
                            .datum(paidData)
                            .attr("fill", "none")
                            .attr("stroke", "green")
                            .attr("stroke-width", 2)
                            .attr("d", line)
                            .style("cursor", "pointer");



        const unpaidCurve = svg.append("path")
                                .datum(unpaidData)
                                .attr("fill", "none")
                                .attr("stroke", "red")
                                .attr("stroke-width", 2)
                                .attr("d", line);



    }, []);

  return <div id="chart-container" ref={divContainer} className={styles.container}></div>;

};



export default LineChart;
