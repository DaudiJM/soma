import MenuIcon from "@mui/icons-material/Menu"
import Logout from "@mui/icons-material/Logout";
import { Utils } from "utils/Utils";
import { useAuth, useSettings, useSnackbar } from "core/hooks/custom-hooks";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import useAuthManager from "core/hooks/use-auth-manager";


const AppToolbar = () => {
    const { toggleDrawer } = useSettings();
    const { logout } = useAuthManager();
    const { user } = useAuth();
    const { showAlert } = useSnackbar();

    const handleLogout = () => {
        showAlert("Logout Successful", "success")
        logout();
    }

    return(
        <Toolbar sx={{ px: { xs:3, sm:6}}}>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={toggleDrawer}
                sx={{
                  display: { lg: "none" },
                  marginRight: 2,
                }}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h2" component="h1">{ Utils.PROJECT_NAME }</Typography>
            <Box flexGrow={1}/>
            {user !== null && <Stack spacing={1} sx={{px:5}}>
                <Typography variant="h5">{ user?.username }</Typography>
                <Typography variant="h6">{ user?.email } | { user?.roles[0] }</Typography>
            </Stack>}
            <IconButton onClick={handleLogout}>
                <Logout />
            </IconButton>
        </Toolbar>
    );
}

export default AppToolbar;