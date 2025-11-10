

export type AppThemeType = Readonly<{
        TEXTCOLOR: string;
        BACKGROUNDCOLOR: string;
        ACTIVEICONBACKGROUNDCOLOR?: string,
        TEXTINPUT?:{
                TEXTCOLOR?: string;
                BACKGROUNDCOLOR?: string;
                PLACEHOLDERCOLOR?: string;
        };
        CHECKBOXINPUT?: {
                BORDERCOLOR?: string;
                BACKGROUNDCOLOR?: string
                HOVER?: {
                        BACKGROUNDCOLOR?: string;
                }
                ACTIVE?:{
                        COLOR: string;
                        BACKGROUNDCOLOR: string
                }
        };
        SIDEBAR:{
                TEXTCOLOR: string;
                BACKGROUNDCOLOR: string;
                ACTIVE?:{
                        TEXTCOLOR: string;
                }
        }
        CURVE?: {
                axes?: {
                        fill?:   string;
                        stroke?: string
                        strokeWidth?: string
                },
                background: string,
        };
        TABLE?:{
                BACKGROUNDCOLOR: string
        }
}>


export const AppDarkTheme: AppThemeType = Object.freeze({
    TEXTCOLOR: "white",
    BACKGROUNDCOLOR: "rgba(25, 24, 25, 0.94)",
    TEXTINPUT:{
        TEXTCOLOR: "white",
        PLACEHOLDERCOLOR: "white",
        BACKGROUNDCOLOR: "rgba(25, 24, 25, 0.94)"
    },
    SIDEBAR:{
        TEXTCOLOR: "white",
        BACKGROUNDCOLOR:  "#333233",
        ACTIVE:{
                TEXTCOLOR: "white"
        }
    },
    TABLE:{
        BACKGROUNDCOLOR: "rgba(25, 24, 25, 0.94)"
    },
    CHECKBOXINPUT: {
        BORDERCOLOR: "#888",
        BACKGROUNDCOLOR: "rgba(25, 24, 25, 0.94)",
        HOVER:{
                BACKGROUNDCOLOR: "#e5e7eb"
        },
        ACTIVE:{
                COLOR: "white",
                BACKGROUNDCOLOR: "#10b981"
        }
    }
})




export const AppWhiteTheme: AppThemeType = Object.freeze({
    TEXTCOLOR: "black",
    BACKGROUNDCOLOR: "#F9F8F6",
    SIDEBAR:{
        TEXTCOLOR: "white",
        BACKGROUNDCOLOR:  "#333233",
        ACTIVE:{
                TEXTCOLOR: "white"
        }
    }
})

