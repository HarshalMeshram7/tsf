import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function RejectFormDialog({open, setOpen,handleReject,formik}) {

  return (
    <React.Fragment>
      <Dialog open={open} onClose={()=>{setOpen(false)}}>
        <DialogTitle>Reject</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please Specify Reason For Rejection
          </DialogContentText>
          <TextField
                      variant="standard"
                      error={!!(formik.touched.reject_reason && formik.errors.reject_reason)}
                      fullWidth
                      helperText={formik.touched.reject_reason && formik.errors.reject_reason}
                      label="Reject Reason"
                      name="reject_reason"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="Text areas"
                      multiline
                      value={formik.values.reject_reason}
                    />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{handleReject(4)}}>Reject</Button>
          <Button onClick={()=>{setOpen(false)}}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}