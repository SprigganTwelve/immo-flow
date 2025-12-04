"use client";

import {  SVGAttributes, SVGProps, useLayoutEffect, useRef } from "react";
import * as d3 from "d3";
import styles from "./lineChart.module.css";
import { AppThemeType } from "@/utils/appThemes";





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
    dataset: Dataset;
    tickSettings?: {
        tickVisibility?: boolean;
        xTickVisibility?: boolean;
        yTickVisibility?: boolean;
    },
    axisSettings?: {
        axisVisibility?: boolean;
        xAxisVisibility?: boolean;
        yAxisVisibility?: boolean;
    }
}


export interface GraphDatum{
    coords: Point[]
    settings: {
        fill?: string;
        type: "line" | "area";
        areaMultiplier?: number;
        line?: Partial<SVGAttributes<SVGPathElement>>;
        area?: Partial<SVGAttributes<SVGPathElement>>;
    }
}


export interface CurveData {
    x: number[];
    defs?:[
        {
            gradients?: {
                linear?: [
                    {
                        id: string;
                        target: string;
                        stop: { offset: string, stopColor: string, stopOpacity: number }[]
                        coords:  {x1: string, y1: string;  x2:string; y2: string}
                    }
                ]
            }
        }
    ],
    dotIndicator?: {
        r?: number;
        fill?: string;
        class?: string;
        cursor?: string;
        stroke?: number;
        rPulse?: number;
        strokeWidth?: number;
    },
    areaMultiplier?: number;
    attr?: Partial<SVGAttributes<SVGPathElement>>;
    type: "line" | "area";
}



export interface Dataset {
    dates: Date[];
    data: CurveData[];
    maximumPrice: number;
}



interface Point {
    x: Date;
    y: number;
}



export interface onChartReadyFuncProps{
        divContainer: HTMLDivElement;
        svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
        chartsGridX: d3.Selection<SVGGElement, unknown, null, undefined>;
        yAxisGroup: d3.Selection<SVGGElement, unknown, null, undefined>;
        xAxisGroup: d3.Selection<SVGGElement, unknown, null, undefined>;
}




const LineChart : React.FC<LineChartPops> = ({
    margin,
    dataset,
    appTheme,
    onChartReady,
    tickSettings,
    axisSettings,
}) => {
            
        const divContainer = useRef<HTMLDivElement>(null);

        const today = new Date();

        useLayoutEffect(() => {

            if (!divContainer.current) return;
            d3.select(divContainer.current).selectAll("*").remove();
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


            // Filters
                //visibility

            if(tickSettings){
                 if( typeof tickSettings.tickVisibility !== "undefined" && !tickSettings.tickVisibility){
                    xAxisGroup.selectAll(".tick").remove()
                    yAxisGroup.selectAll(".tick").remove()
                }
                else if(typeof tickSettings.tickVisibility !== "undefined" && !tickSettings.xTickVisibility)
                    xAxisGroup.selectAll(".tick").remove()
                else if(typeof tickSettings.tickVisibility !== "undefined" && !tickSettings.xTickVisibility)
                    yAxisGroup.selectAll(".tick").remove()
            }


            if (axisSettings) {
                if (typeof axisSettings.axisVisibility !== "undefined" && !axisSettings.axisVisibility) {
                    xAxisGroup.selectAll(".domain").remove();
                    yAxisGroup.selectAll(".domain").remove();
                }

                if (typeof axisSettings.xAxisVisibility !== "undefined" && !axisSettings.xAxisVisibility) {
                    xAxisGroup.selectAll(".domain").remove();
                }

                if (typeof axisSettings.yAxisVisibility !== "undefined" && !axisSettings.yAxisVisibility) {
                    yAxisGroup.selectAll(".domain").remove();
                }
            }


            // points


            
        let grapDatum: GraphDatum[] = dataset.data.map(mark => {
            let settings: GraphDatum['settings'] = { 
                type: mark.type,
                areaMultiplier: mark.areaMultiplier,
                line: mark.type === 'line' ? { ...mark.attr } : undefined,
                area: mark.type === 'area' ? { ...mark.attr } : undefined,
                fill: undefined // fallback
            };

            if(mark.defs){
                mark.defs.forEach(defs => {
                    const dfs = svg.append("defs");
                    defs.gradients?.linear?.forEach(ln => {
                        const gradient = dfs.append("linearGradient")
                            .attr("id", ln.id)
                            .attr("x1", ln.coords.x1)
                            .attr("y1", ln.coords.y1)
                            .attr("x2", ln.coords.x2)
                            .attr("y2", ln.coords.y2);

                        ln.stop.forEach(stp => 
                            gradient.append("stop")
                                .attr("offset", stp.offset)
                                .attr("stop-color", stp.stopColor)
                                .attr("stop-opacity", stp.stopOpacity)
                        );

                        if(mark.type === 'area') settings.area = { ...settings.area, fill: `url(#${ln.id})` };
                        if(mark.type === 'line') settings.line = { ...settings.line, stroke: `url(#${ln.id})` };
                    });
                });
            }

            const coords = dataset.dates.map((d, i) => ({ x: d, y: mark.x[i] }));

            return { coords, settings };
        });




            // draw curves

            grapDatum.forEach((graphData, i) => {
                const curveDegree = 0.5
                const dot = dataset.data[i].dotIndicator;

                if(graphData.settings.type === "area"){
                    const areaMultiplier = graphData.settings?.areaMultiplier || 1;

                    // Dessiner l’aire
                    chartsGridX
                        .append("path")
                        .datum(graphData.coords)
                        .attr("fill", graphData.settings.area?.fill || "var(--app-textColor)")
                        .attr("stroke", graphData.settings.area?.stroke || "none")
                        .attr("stroke-width", graphData.settings.area?.strokeWidth ?? 0)
                        .attr("d", d3.area<{ x: Date; y: number }>()
                            .x(d => xScale(d.x))
                            .y0(yScale(0))
                            .y1(d => yScale(d.y * areaMultiplier))
                            .curve(d3.curveCatmullRom.alpha(curveDegree))
                        );
                }
                
                if (graphData.settings.type === "line") {

                    // the associated area with the same coord length
                    const areaMatch = grapDatum.find(g =>
                        g.settings.type === "area"
                        && g.coords.length === graphData.coords.length
                        // optionnal : compare timestamp of x pointy to make that it the serie is right
                        && g.coords.every((p, idx) => +p.x === +graphData.coords[idx].x)
                    );

                    const areaMultiplier = areaMatch?.settings?.areaMultiplier ?? 1;

                    // tranforme every point of the line for sticking them to the area
                    const transformedLineCoords = graphData.coords.map(d => ({
                        ...d,
                        y: d.y * areaMultiplier        // scaling point-by-point (ou d.y + (d.y*(m-1)))
                    }));

                    chartsGridX
                    .append("path")
                    .datum(transformedLineCoords)
                    .attr("stroke", graphData.settings.line?.stroke || "var(--app-textColor)")
                    .attr("stroke-width", graphData.settings.line?.strokeWidth ?? 2)
                    .attr("fill", "none")
                    .attr("d", d3.line<{ x: Date; y: number }>()
                        .x(d => xScale(d.x))
                        .y(d => yScale(d.y))
                        .curve(d3.curveCatmullRom.alpha(curveDegree))
                    );
                }


                // add interactive points
                
                if(dot)
                    chartsGridX
                        .selectAll( dot.class  || ".dot-paid")
                        .data(graphData.coords)
                        .enter()
                        .append("circle")
                        .attr("class", dot.class || "dot-paid")
                        .attr("cx", d => xScale(d.x))
                        .attr("cy", d => yScale(d.y))
                        .attr("r", dot.r || 7)
                        .attr("fill", dot.fill || graphData.settings.fill || "var(-app-textColor)")
                        .attr("stroke", dot.stroke || "var(--app-textColor)")
                        .attr("stroke-width", dot.strokeWidth || 1)
                        .style("cursor", dot.strokeWidth || "pointer")
                        .on("mouseover", (event, d) => {
                            d3.select(event.currentTarget).transition().attr("r", dot.rPulse || 9);
                        })
                        .on("mouseout", (event, d) => {
                            d3.select(event.currentTarget).transition().attr("r", dot.r || 7);
                        });
            });



            if(onChartReady)
                onChartReady({ svg, chartsGridX, divContainer: divContainer.current, xAxisGroup, yAxisGroup })

        }, [appTheme, margin, onChartReady, dataset]);

        return <div ref={divContainer} className={styles.container}></div>;
};



export default LineChart;


