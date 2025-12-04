

export type AppThemeType = Readonly<{
        TEXTCOLOR: string;
        BACKGROUNDCOLOR: string;
        ACTIVEICONBACKGROUNDCOLOR?: string,
        TEXTINPUT?:{
                TEXTCOLOR?: string;
                BACKGROUNDCOLOR?: string;
                PLACEHOLDERCOLOR?: string;
        };
        LIGHTTEXTCOLOR?: string;
        NEUTRALSOFTCOLOR?: string;
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
                        COLOR: string;
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
        CONTAINER?: {
                PRIMARYCOLOR?: string;   //more oriented for large background surface
                SECONDARYCOLOR?: string;
        }
}>




export const AppDarkTheme: AppThemeType = Object.freeze({
    TEXTCOLOR: "#E6E6EB",                     // texte gris très clair légèrement violet
    BACKGROUNDCOLOR: "#0F0F12",               // fond principal anthracite-matte
    LIGHTTEXTCOLOR: "#DDE2F5",
    NEUTRALSOFTCOLOR: "rgba(31, 36, 41, 0.85)",
    TEXTINPUT: {
        TEXTCOLOR: "#E6E6EB",
        PLACEHOLDERCOLOR: "#7E7E8A",          // gris-violet doux
        BACKGROUNDCOLOR: "#1A1A22"            // gris-violet foncé
    },

    SIDEBAR: {
        TEXTCOLOR: "#C9C9D6",                 // gris clair chaleureux
        BACKGROUNDCOLOR: "#14141A",           // noir-violet profond cohérent
        ACTIVE: {
            COLOR: "#A679FF"                  // violet lumineux harmonisé
        }
    },

    CONTAINER: {
        PRIMARYCOLOR: "#181820",              // gris-violet soft
        SECONDARYCOLOR: "#2E2A45"             // violet muted
    },

    TABLE: {
        BACKGROUNDCOLOR: "#1A1A22"            // même base que TEXTINPUT
    },

    CHECKBOXINPUT: {
        BORDERCOLOR: "#70707C",
        BACKGROUNDCOLOR: "#1A1A22",
        HOVER: {
            BACKGROUNDCOLOR: "#22222B"
        },
        ACTIVE: {
            COLOR: "#FFFFFF",
            BACKGROUNDCOLOR: "#A679FF"        // même violet que SIDEBAR.ACTIVE
        }
    }
});



export const AppWhiteTheme: AppThemeType = Object.freeze({
    TEXTCOLOR: "#1A1C1E",                       // gris-noir moderne, doux
    LIGHTTEXTCOLOR: "#6A6D78",                  // gris subtil pour labels
    BACKGROUNDCOLOR: "#F4F5F7",                 // gris clair premium
    NEUTRALSOFTCOLOR: "rgba(244, 246, 248, 0.8)",
    ACTIVEICONBACKGROUNDCOLOR: "rgba(80, 120, 255, 0.12)",

    // ========================= SIDEBAR =========================
    SIDEBAR: {
        TEXTCOLOR: "#E7E9EC",                   // blanc-gris doux
        BACKGROUNDCOLOR: "#1F2125",             // gris anthracite profond
        ACTIVE: {
            COLOR: "#6A8CFF"                    // bleu électrique élégant
        }
    },

    // ========================= INPUTS =========================
    TEXTINPUT: {
        TEXTCOLOR: "#1A1C1E",
        PLACEHOLDERCOLOR: "#8C9099",
        BACKGROUNDCOLOR: "#FFFFFF"
    },

    // ========================= CHECKBOX =========================
    CHECKBOXINPUT: {
        BORDERCOLOR: "#C5C8D2",
        BACKGROUNDCOLOR: "#FFFFFF",
        HOVER: {
            BACKGROUNDCOLOR: "#EEF1F7"
        },
        ACTIVE: {
            COLOR: "#FFFFFF",
            BACKGROUNDCOLOR: "#6A8CFF"
        }
    },

    // ========================= CONTAINERS =========================
    CONTAINER: {
        PRIMARYCOLOR: "#FFFFFF",
        SECONDARYCOLOR: "#E8EBF3"               // gris froid texturé
    },

    // ========================= TABLES =========================
    TABLE: {
        BACKGROUNDCOLOR: "#FFFFFF"
    },

    // ========================= CHARTS / CURVES =========================
    CURVE: {
        axes: {
            fill: "#555A65",                    // gris bleuté soft
            stroke: "#D0D3DA",                  // gris neutre pour les axes
            strokeWidth: "1",
        },
        background: "transparent",              // charts floating design
    }
});
