import Button from "@mui/material/Button";
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { useRouter } from "core/hooks/custom-hooks";
import { ReactNode } from "react"

type Props = {
    title?: string;
    subtext?: string;
    children: ReactNode;
    actions?: ReactNode;
    hideBackButton?: boolean; 
}

const CCard = ({ title, children, actions, subtext, hideBackButton = false } : Props) => {
    const { back } = useRouter();
    return(
        <Card>
            <CardHeader
                title={title}
                subheader={subtext}
                action={
                    <Stack direction="row">
                        {actions}
                        {!hideBackButton && <Button color="inherit" onClick={back}>Back</Button>}
                    </Stack>
                }
            />
            {actions !== undefined && <Divider 
                sx={{
                    p:1,
                    mx:4
                }}
            />}
            <CardContent>
                { children }
            </CardContent>
        </Card>
    );
}

export default CCard;