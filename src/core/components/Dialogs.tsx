import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import React, { PropsWithChildren } from "react"
import { Close } from "@mui/icons-material"
import Toolbar from "@mui/material/Toolbar"
import Tooltip from "@mui/material/Tooltip"
import IconButton from "@mui/material/IconButton"
import { Breakpoint } from "@mui/material/styles";

type Props = {
    open: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    title?: string;
    loading?: boolean;
    width?: Breakpoint;
}

const CustomDialog:React.FC<PropsWithChildren<Props>> = ({ title, open, onClose, onConfirm, children, width = "sm"}) => {

    return(
        <Dialog
            open={open}
            onClose={() => onClose()}
            maxWidth={width}
            fullWidth
        >
            <Toolbar sx={{pb:2, display: "flex", justifyContent: "space-between"}}>
                { title }
                <Tooltip title="Close">
                    <IconButton onClick={() => onClose()}>
                        <Close />
                    </IconButton>
                </Tooltip>
            </Toolbar>
            <DialogContent>
                { children }
            </DialogContent>
        </Dialog>
    )
}

export default CustomDialog;