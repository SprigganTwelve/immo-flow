

import { Dataset } from "@/ui/charts/lineChart/lineChart";
import { PieChartSegment } from "@/ui/charts/pieChart/pieChart";


const today = new Date();



export const monthlyAverageDataset: Dataset = {
  dates: [
    new Date(today.getFullYear(), 0, 1),
    new Date(today.getFullYear(), 0, 15),
    new Date(today.getFullYear(), 1, 2),
    new Date(today.getFullYear(), 2, 4),
    new Date(today.getFullYear(), 2, 25),
    new Date(today.getFullYear(), 3, 12),
    new Date(today.getFullYear(), 4, 7),
    new Date(today.getFullYear(), 4, 22),
    new Date(today.getFullYear(), 5, 30),
    new Date(today.getFullYear(), 6, 10),
    new Date(today.getFullYear(), 7, 14),
    new Date(today.getFullYear(), 7, 29),
    new Date(today.getFullYear(), 8, 3),
    new Date(today.getFullYear(), 9, 1),
    new Date(today.getFullYear(), 9, 22),
    new Date(today.getFullYear(), 10, 15),
    new Date(today.getFullYear(), 11, 5),
    new Date(today.getFullYear(), 11, 20),
  ],
  data: [
    {
      x: [38000, 42000, 50000, 60000, 75000, 90000, 85000, 92000, 70000, 60000, 68000, 72000, 88000, 93000, 97000, 85000, 72000, 65000],
      type: "area",
      areaMultiplier: 1.1,
      defs: [
        {
          gradients: {
            linear: [
              {
                id: "gradient-monthly-area",
                target: "fill",
                coords: { x1: "0%", y1: "0%", x2: "0%", y2: "100%" },
                stop: [
                  { offset: "0%", stopColor: "limegreen", stopOpacity: 0.5 },
                  { offset: "100%", stopColor: "limegreen", stopOpacity: 0 },
                ],
              },
            ],
          },
        },
      ],
    },
    {
      x: [38000, 42000, 50000, 60000, 75000, 90000, 85000, 92000, 70000, 60000, 68000, 72000, 88000, 93000, 97000, 85000, 72000, 65000],
      type: "line",
      attr: { stroke: "limegreen", strokeWidth: 2 },
    },
  ],
  maximumPrice: 100000,
};



export const turnoverDataset: Dataset = {
  dates: monthlyAverageDataset.dates,
  data: [
    {
      x: [55000, 60000, 65000, 72000, 80000, 85000, 83000, 90000, 78000, 72000, 75000, 78000, 90000, 94000, 98000, 91000, 78000, 70000],
      type: "area",
      areaMultiplier: 1.05,
      defs: [
        {
          gradients: {
            linear: [
              {
                id: "gradient-turnover-area",
                target: "fill",
                coords: { x1: "0%", y1: "0%", x2: "0%", y2: "100%" },
                stop: [
                  { offset: "0%", stopColor: "#1E90FF", stopOpacity: 0.5 },
                  { offset: "100%", stopColor: "#1E90FF", stopOpacity: 0 },
                ],
              },
            ],
          },
        },
      ],
    },
    {
      x: [55000, 60000, 65000, 72000, 80000, 85000, 83000, 90000, 78000, 72000, 75000, 78000, 90000, 94000, 98000, 91000, 78000, 70000],
      type: "line",
      attr: { stroke: "#1E90FF", strokeWidth: 2 },
    },
  ],
  maximumPrice: 100000,
};



export const lossDataset: Dataset = {
  dates: monthlyAverageDataset.dates,
  data: [
    {
      x: [5000, 4000, 3000, 3500, 4500, 4200, 3900, 3700, 4100, 4300, 4800, 5000, 4700, 4500, 4200, 3900, 3600, 3400],
      type: "area",
      areaMultiplier: 13,
      defs: [
        {
          gradients: {
            linear: [
              {
                id: "gradient-loss-area",
                target: "fill",
                coords: { x1: "0%", y1: "0%", x2: "0%", y2: "100%" },
                stop: [
                  { offset: "0%", stopColor: "tomato", stopOpacity: 0.5 },
                  { offset: "100%", stopColor: "tomato", stopOpacity: 0 },
                ],
              },
            ],
          },
        },
      ],
    },
    {
      x: [5000, 4000, 3000, 3500, 4500, 4200, 3900, 3700, 4100, 4300, 4800, 5000, 4700, 4500, 4200, 3900, 3600, 3400],
      type: "line",
      attr: { stroke: "tomato", strokeWidth: 2 },
    },
  ],
  maximumPrice: 100000,
};




 

export const basicsPieChartDataset: PieChartSegment[] = [
    {
        percent: 40,
        innerRadius: 0,
        outerRadius: 300,
        thickness: 80,
        colors: {
            front: "#ff4d4d",
            back: "#cc0000",
            left: "#ff9999",
            right: "#990000",
            side: "#ff6666",
            backside: "#b30000",
        },
    },
    {
        percent: 25,
        innerRadius: 20,
        outerRadius: 280,
        thickness: 60,
        colors: {
            front: "#4da6ff",
            back: "#0066cc",
            left: "#99ccff",
            right: "#003366",
            side: "#3399ff",
            backside: "#004080",
        },
    },
    {
        percent: 20,
        innerRadius: 40,
        outerRadius: 260,
        thickness: 40,
        colors: {
            front: "#33cc33",
            back: "#009900",
            left: "#99ff99",
            right: "#006600",
            side: "#66ff66",
            backside: "#007300",
        },
    },
    {
        percent: 15,
        innerRadius: 60,
        outerRadius: 240,
        thickness: 50,
        colors: {
            front: "#ffcc33",
            back: "#cc9900",
            left: "#ffe066",
            right: "#996600",
            side: "#ffdd66",
            backside: "#995500",
        },
    },
];
