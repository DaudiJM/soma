import { AppBar } from "@mui/material"
import { drawerCollapsedWidth, drawerWidth } from "../../../core/config/layout";
import React, { PropsWithChildren } from "react";
import { useSettings } from "../../../core/hooks/custom-hooks";


const TopBar:React.FC<PropsWithChildren> = ({ children }) => {
    const { collapsed } = useSettings();
    const width = collapsed ? drawerCollapsedWidth : drawerWidth;


    return(
        <AppBar color="default" position="fixed" sx={{width: { lg: `calc(100% - ${width}px)` }, marginLeft: { lg: width },}}>
            { children }
        </AppBar>
    )
}

export default TopBar;