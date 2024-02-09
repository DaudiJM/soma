import Box from "@mui/material/Box";
import AppRoutes from "./AppRoutes";
import SettingsProvider from "./core/contexts/SettingsProvider";
import AuthProvider from "./core/contexts/AuthProvider";
import { BrowserRouter } from "react-router-dom";
import SnackbarProvider from "./core/contexts/SnackbarProvider";
import SettingsDrawer from "./core/components/SettingsDrawer";
import ErrorProvider from "core/contexts/ErrorProvider";
import RouteProvider from "core/contexts/RouteProvider";


function App() {

  return (
    <Box>
      <AuthProvider>
        <BrowserRouter>
          <RouteProvider>
            <SettingsProvider>
              <SnackbarProvider>
                <ErrorProvider>
                  <AppRoutes />
                  <SettingsDrawer />
                </ErrorProvider>
              </SnackbarProvider>
            </SettingsProvider>
          </RouteProvider>
        </BrowserRouter>
      </AuthProvider>
    </Box>
  );
}

export default App;
