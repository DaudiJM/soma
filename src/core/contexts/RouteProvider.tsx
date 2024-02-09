import { useLocalStorage } from "core/hooks/useLocalStorage";
import { createContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";


type RouteProviderProps = {
    from: string | null;
    go: (route: string) => void;
    setfrom: (route: string | null) => void;
    back: () => void;
    route: string | null;
}

export const RouteContext = createContext({} as RouteProviderProps);

type Props = {
    children: React.ReactNode;
}

const RouteProvider = (props: Props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [from, setfrom] = useLocalStorage<string | null>("from", "");
    const [route, setRoute] = useLocalStorage<string | null>("path", "");

    const go = (route: string) => {
        setfrom(location.pathname);
        setRoute(route);
        navigate(route);
    }

    const back = () => {
        if(from !== null){
            go(from);
        }
    }

    return (
        <RouteContext.Provider
            value={{ back, from, go, setfrom, route }}
        >
            { props.children }
        </RouteContext.Provider>
    );
}

export default RouteProvider;