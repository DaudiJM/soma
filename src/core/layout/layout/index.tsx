import Box from "@mui/material/Box"
import TopBar from "../sections/top-bar"
import AppToolbar from "../sections/app-toolbar"
import AppDrawer from "../sections/drawer"
import Toolbar from "@mui/material/Toolbar"
import CssBaseline from "@mui/material/CssBaseline"
import { Outlet } from "react-router-dom"
import usePasswordManager from "core/hooks/usePasswordManager"
import CustomDialog from "core/components/Dialogs"
import ChangePassword from "pages/user/sections/ChangePassword"


const Layout = () => {
   const { promptPasswordChange } = usePasswordManager();
    
    return(
        <Box sx={{display: "flex"}}>
            <TopBar>
                <AppToolbar />
            </TopBar>
            <AppDrawer />
            <Box component="main" sx={{ flexGrow: 1, pb: 3, px: { xs: 3, sm: 6 } }}>
                <Toolbar />
                <CssBaseline />
                <Outlet />
            </Box>
            {/* {promptPasswordChange && <CustomDialog open={promptPasswordChange} onClose={() => {}} title="Change Password" children={<ChangePassword />}/>} */}
        </Box>
    )
}

export default Layout;