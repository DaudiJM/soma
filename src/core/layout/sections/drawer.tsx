import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Drawer from "@mui/material/Drawer";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ListItem from "@mui/material/ListItem";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import { AdminMenuItems,  devMenuItems,  MenuItems,  StaffMenu,  StudentMenu } from "./menu-items";
import { drawerCollapsedWidth, drawerWidth } from "core/config/layout";
import { useAuth, useRouter, useSettings } from "core/hooks/custom-hooks";
import { LogoSmall } from "core/components/Logo";
import { useEffect, useState } from "react";
import { Role } from "utils/enums";
import routes from "utils/routes";


const DrawerMenu = () => {
    const { collapsed, toggleSettings } = useSettings();
    const { go } = useRouter();
    const { user } = useAuth();
    const [menuItems, setMenuItems] = useState(devMenuItems);

    const to = (route: string) => () => {
        go(route);
    }

    const loadMenuItems = () => {
        let userMenuItems = MenuItems;

        if(user?.roles[0]?.includes(Role.ADMINISTRATOR)){
            userMenuItems = AdminMenuItems;
        }

        if(user?.roles[0]?.includes(Role.STUDENT)){
            userMenuItems = StudentMenu;
        }

        if(user?.roles[0]?.includes(Role.STAFF)){
            userMenuItems = StaffMenu;
        }

        setMenuItems(userMenuItems);
    }
    

    useEffect(() => {
        loadMenuItems();

        return () => {};
    }, [user]);

    return(
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100%"}}>
            <Box sx={{px:6, py:1}}>
                <LogoSmall />
            </Box>
            <List component="nav" sx={{px:2}}>
                {menuItems.map((item) => (
                    <ListItem 
                        key={item.title}
                        disablePadding
                        onClick={to(item.route)}
                    >
                        <ListItemButton sx={{borderRadius:1}}>
                            <ListItemAvatar>
                                <Avatar sx={{ color: "inherit", bgcolor: "transparent" }}>
                                    <item.icon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={item.title}
                                sx={{display: collapsed ? "none" : "block",}}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <List component="nav" sx={{p:2, mt:"auto"}}>
                <ListItem  disablePadding>
                    <ListItemButton sx={{borderRadius:1}} onClick={to(routes.profile)}>
                        <ListItemAvatar>
                            <Avatar>
                            <PersonOutlinedIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                            primary={user?.name ?? "User"}
                            secondary="Profile Settings"
                            sx={{display: collapsed ? "none" : "block",}}
                        />
                    </ListItemButton>
                </ListItem>
                <ListItem  disablePadding>
                    <ListItemButton onClick={toggleSettings} sx={{borderRadius:1}}>
                        <ListItemAvatar>
                            <Avatar>
                            <SettingsOutlinedIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                            primary="Settngs"
                            sx={{display: collapsed ? "none" : "block",}}
                        />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    )
}

const AppDrawer = () => {
    const { openDrawer, collapsed, toggleDrawer} = useSettings();
    const width = collapsed ? drawerCollapsedWidth : drawerWidth;

    return(
        <Box
            aria-label="Admin drawer"
            component="nav"
            sx={{
            width: { lg: width },
            flexShrink: { lg: 0 },
            }}
        >
            <Drawer
                variant="temporary"
                open={openDrawer}
                onClose={toggleDrawer}
                ModalProps={{
                keepMounted: true,
                }}
                sx={{
                display: { xs: "block", lg: "none" },
                "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: width,
                },
                }}
            >
                <DrawerMenu />
            </Drawer>
            <Drawer
                variant="permanent"
                open
                sx={{
                display: { xs: "none", lg: "block" },
                "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: width,
                },
                }}
            >
                <DrawerMenu />
            </Drawer>
        </Box>
    )
}

export default AppDrawer;