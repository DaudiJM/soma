import { drawerWidth } from "../config/layout";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import { useSettings } from "../hooks/custom-hooks";


const SettingsDrawer = () => {
  const { changeCollapsed, changeMode, collapsed, mode, toggleSettings, openSettings} = useSettings();

  const handleModeChange = (_: any, mode: string) => {
    changeMode(mode);
  };

  const handleSidebarChange = (_: any, collapsed: boolean) => {
    changeCollapsed(collapsed);
  };

  return (
    <Drawer
      anchor="right"
      open={openSettings}
      onClose={toggleSettings}
      sx={{
        "& .MuiDrawer-paper": {
          width: drawerWidth,
        },
      }}
      variant="temporary"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
        }}
      >
        <Typography variant="h5">Settings</Typography>
        <IconButton color="inherit" onClick={toggleSettings} edge="end">
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={{ pl: 2, pr: 2 }}>
        <Typography gutterBottom id="settings-mode" marginTop={3} variant="h6">Mode</Typography>
        <ToggleButtonGroup
          color="primary"
          value={mode}
          exclusive
          fullWidth
          onChange={handleModeChange}
        >
          <ToggleButton value="light">Light</ToggleButton>
          <ToggleButton value="dark">Dark</ToggleButton>
        </ToggleButtonGroup>
        
        <Typography
          gutterBottom
          id="settings-sidebar"
          marginTop={3}
          variant="h6"
        >
          Sidebar</Typography>
        <ToggleButtonGroup
          color="primary"
          value={collapsed}
          exclusive
          fullWidth
          onChange={handleSidebarChange}
        >
          <ToggleButton value={true}>Collapsed</ToggleButton>
          <ToggleButton value={false}>Full</ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </Drawer>
  );
};

export default SettingsDrawer;
