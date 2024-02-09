
import { ReactComponent as ConfirmSvg } from "../assets/confirm.svg";
import SvgContainer from "./SvgContainer";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import React from "react";
import { DialogInterface } from "./component-interfaces";


const ConfirmDialog:React.FC<DialogInterface> = ({onClose, open, onConfirm = () => {}, title, loading = false}) => {

  return (
    <Dialog
      open={open}
      onClose={() => onClose()}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
      maxWidth="sm"
    >
      <DialogContent sx={{ textAlign: "center" }}>
        <SvgContainer>
          <ConfirmSvg style={{ maxWidth: 280, width: "100%" }} />
        </SvgContainer>
        <DialogTitle id="confirm-dialog-title" sx={{ pb: 1, pt: 0 }}>
          Warning
        </DialogTitle>
        <DialogContentText id="confirm-dialog-description">
            { title }
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error">Cancel</Button>
        <LoadingButton loading={loading} onClick={onConfirm} variant="contained">
           Confirm
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
