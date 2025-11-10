

import { AppThemeType } from "@/utils/appThemes";
import React from "react";



interface SeperatorProps{
    AppTheme: AppThemeType;
    radius?: number | string;
    thickness?: number | string;
    marginTop?: number | string;
    width?: number | string | "100%";
}



const Seperator: React.FC<SeperatorProps> = ({
    AppTheme,
    radius= "20px",
    width = "100%",
    thickness = "1px",
    marginTop = "5.7px"
}) => {
    return ( 
        <div 
            style={{ 
                width: width,
                height: thickness,
                backgroundColor: AppTheme.TEXTCOLOR,
                marginTop: marginTop,
                borderRadius: radius
            }}
        />
    );
}

 
export default Seperator;