import Alert, { AlertColor} from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Snackbar from "@mui/material/Snackbar";
import useToggle from "core/hooks/use-toggle";
import React, { createContext, useState } from "react";
import { capitalize } from "utils/Utils";

interface SnackbarContextInterface {
  showAlert: (message: string, severity: AlertColor) => void;

}

export const SnackbarContext = createContext({} as SnackbarContextInterface);

type SnackbarProviderProps = {
  children: React.ReactNode;
};

const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  const [open, toggle] = useToggle();
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<AlertColor | undefined>(undefined);


  const showAlert = (message: string, severity: AlertColor) => {
    setSeverity(severity);
    setMessage(message);
    toggle();
  }

  return (
    <SnackbarContext.Provider value={{ showAlert }}>
      {children}
      <Snackbar
        key={message}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        autoHideDuration={5000}
        onClose={toggle}
      >
        <Alert onClose={toggle} severity={severity}>
          <AlertTitle>{capitalize(severity ?? "Info")}</AlertTitle>
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
