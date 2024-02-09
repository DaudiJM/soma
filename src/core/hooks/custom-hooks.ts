import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { SnackbarContext } from "../contexts/SnackbarProvider";
import { SettingsContext } from "../contexts/SettingsProvider";
import { ErrorContext } from "core/contexts/ErrorProvider";
import { RouteContext } from "core/contexts/RouteProvider";


export const useAuth = () => {
    return useContext(AuthContext);
}

export const useSnackbar = () => {
    return useContext(SnackbarContext);
}

export const useSettings = () => {
    return useContext(SettingsContext);
}

export const useError = () => {
    return useContext(ErrorContext);
}

export const useRouter = () => {
    return useContext(RouteContext);
}