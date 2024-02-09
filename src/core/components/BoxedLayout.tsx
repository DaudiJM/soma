
import React from "react";
import { AppBar, Box, Container, GlobalStyles, IconButton, Toolbar, Typography, useTheme } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useSettings } from "../hooks/custom-hooks";
import { Utils } from "utils/Utils";

type BoxedLayoutProps = {
  children: React.ReactNode;
};

const BoxedLayout = ({ children }: BoxedLayoutProps) => {
  const theme = useTheme();
  const { toggleSettings } = useSettings();
  
  return (
    <React.Fragment>
      <GlobalStyles
        styles={{ body: { backgroundColor: theme.palette.background.paper } }}
      />
      <AppBar color="transparent" position="relative">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            aria-label="settings"
            component="span"
            onClick={toggleSettings}
          >
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="xs" sx={{ mt: 6 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h1">
            { Utils.PROJECT_NAME }
          </Typography>
          {children}
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default BoxedLayout;
