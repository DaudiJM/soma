import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/custom-hooks";


type Props = {
    allowedRoles: string[];
}


const PrivateRoute:React.FC<Props> = ({ allowedRoles }) => {
    const { user, isUserAuthenticated } = useAuth();
    const location = useLocation();

    return(
        isUserAuthenticated ? 
        allowedRoles.includes(user?.roles[0] ?? "") ? <Outlet /> : <Navigate to="/forbidden" state={{ from : location }} replace /> 
            : <Navigate to="/" state={{ from: location }} replace/>
    );
}

export default PrivateRoute;