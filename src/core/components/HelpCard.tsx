import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card"
import CardActionArea from "@mui/material/CardActionArea"
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";

type Props = {
    title: string;
    icon: React.ReactNode,
    disabled?: boolean;
    path?: string;
    onClick?: () => void;
}


const HelpCard:React.FC<Props> = ({icon, title, disabled = false, path = "/under-construction", onClick}) => {
    const navigate = useNavigate();

    return(
        <Card>
            <CardActionArea disabled={disabled} onClick={onClick != undefined ? onClick : () => navigate(path)}>
                {/* <CardHeader avatar={
                    <Avatar>
                        {icon}
                    </Avatar>
                }/> */}
                <CardContent>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>{title}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default HelpCard;