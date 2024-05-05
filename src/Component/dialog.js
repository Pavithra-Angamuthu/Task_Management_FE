import React from "react";

import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
} from "@mui/material";

function DialogBox(props) {
  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        onClose={() => {
          props.setOpen(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="delete">
          {props.status ? "De-Active" : "Active"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to {props.status ? "De-Active" : "Active"} this Task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            size="small"
            variant="contained"
            onClick={() => {
              props.setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              props.delete();
            }}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default DialogBox;
