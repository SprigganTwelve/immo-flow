import React, { 
    useRef,
    useLayoutEffect,
    CSSProperties,
} from 'react'
import styles from './style.module.css'





export interface CircularProgressorProps{
    size: string;                   //control the ray
    percent: number;
    fontSize?: string;
    edgeSettings?: {
        offset?: {
            start: number;
            end?: number;
        };
        color?: {
            active: string;
            innactive: string;
        };
        padChord?: number;
        length?: string;
        radius?: string;
        thickness?: string;
        startAngle?: number;
        cssProperties?: CSSProperties;
    };
    edgeThickness?: number;
    containerCssProperties?: CSSProperties;
    isPercentVarianteB?: boolean;
}



const CircularProgressor: React.FC<CircularProgressorProps> = ({ 
    size,
    percent,
    edgeSettings,
    fontSize = "35px",
    containerCssProperties,
    isPercentVarianteB=false
}) => {

    const containerRef = useRef<HTMLDivElement | null>(null);

    const sizePart = useRef<(string | number)[]>(size.split(/(\d+)/).filter(Boolean).map((part) => {
        const parse = Number(part);
        return isNaN(parse) ? part : parse;
    }));

    useLayoutEffect(() => {
        if (!containerRef.current) return;
            containerRef.current.innerHTML = ""; // reset before drawing

        const r = sizePart.current[0] as number;     // radius
        const unit = sizePart.current[1] as string;
        const d = r * 2;

        const padChord = edgeSettings?.padChord || 5;
        const thickness = Number(edgeSettings?.thickness?.replace(/[^0-9]/g, "") || 3);

        const gapChordAngle = 2 * Math.asin(padChord / (2 * r));
        const thicknessChordAngle = 2 * Math.asin(thickness / (2 * r));
        const totalAngle = 2 * Math.PI;
        const activeAngle = percent * totalAngle;

        for (let loadAngle = 0; loadAngle < totalAngle; loadAngle += gapChordAngle + thicknessChordAngle) {
            const edge = document.createElement('div');
            edge.style.width = edgeSettings?.length || "25px";
            edge.style.height = edgeSettings?.thickness || "3px";
            edge.style.borderRadius = edgeSettings?.radius || "20px";
            edge.style.position = "absolute";
            edge.style.left = "50%";
            edge.style.top = "50%";
            edge.style.transformOrigin = "center center";

            const rotationDeg = (loadAngle * 180) / Math.PI + (edgeSettings?.offset?.start || 0);
            const translateDistance = r;
            edge.style.transform = `rotate(${rotationDeg}deg) translate(${translateDistance}${unit}, -50%)`;

            if (edgeSettings?.color) {
                edge.style.backgroundColor =
                    loadAngle <= activeAngle ? edgeSettings.color.active : edgeSettings.color.innactive || "transparent";
            } else {
                edge.style.backgroundColor = loadAngle <= activeAngle ? "white" : "gray";
            }

            if (edgeSettings?.cssProperties)
                Object.assign(edge.style, edgeSettings.cssProperties);

            containerRef.current.appendChild(edge);
        }

    }, [percent, edgeSettings, size]);

    return (
        <div
            className={styles.container}
            style={{
                ...containerCssProperties,
                width: `calc(${size} * 2)`,
                height: `calc(${size} * 2)`,
                position: "relative",
            }}
        >
            <div
                ref={containerRef}
                className={styles.rect}
                style={{
                    width: `calc(${size} * 2)`,
                    height: `calc(${size} * 2)`,
                    position: "relative",
                }}
            >
                {/* Circles (edge)  */}
            </div>
            <div
                className={styles.percentWrapper}
            >
                <span className={styles.percent} style={{ fontSize }}>
                    {!isPercentVarianteB ? percent * 100 : percent}
                    <sup>%</sup>
                </span>
            </div>
        </div>
    );
};

export default CircularProgressor;
