import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import React, { PropsWithChildren } from "react"
import { useNavigate } from "react-router-dom";

interface Props extends PropsWithChildren {
    from?: string | null;
}

const CustomToolbar:React.FC<Props> = ({ children, from = null }) => {
    const navigate = useNavigate()

    const to = (to: string) => () => navigate(to);

    return(
        <Toolbar>
            {from !== null && <Button variant="text" onClick={to(from)}>Back</Button>}
            <Box flexGrow={1}/>
            { children }
        </Toolbar>
    )
}

export default CustomToolbar;