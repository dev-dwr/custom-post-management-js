import React from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { BootstrapDialog } from "./BootstrapDialog";

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const ConfirmEmailPopup = ({open, handleClose, email}) => {

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Please Confirm Your Email
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            We have sent you a confirmation email on address: {email}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Ok
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};

export default ConfirmEmailPopup;
