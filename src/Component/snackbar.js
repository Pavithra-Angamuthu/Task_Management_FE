import { Alert, Snackbar } from "@mui/material";
import React from "react";

function SnackbarBox(props) {
  const { open, severity, message } = { ...props.snackbar };

  return (
    <React.Fragment>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => {
          props.setSnackBar((preState) => ({
            ...preState,
            open: false,
          }));
        }}
      >
        <Alert
          onClose={(event) => {
            event.preventDefault();
            props.setSnackBar((preState) => ({
              ...preState,
              open: false,
            }));
          }}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}

export default SnackbarBox;
