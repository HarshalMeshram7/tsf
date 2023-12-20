import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { useFormik } from "formik";
import * as Yup from "yup";
import { Card, CardContent, DialogActions, FormControl, FormLabel, Grid, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material';
import { Box, margin } from '@mui/system';
import { SaveUser } from 'src/service/userRequests';

function SimpleDialog(props) {
  const formik = useFormik({
    initialValues: {
      email: " ",
      password: "",
      name: "",
      gender: "",
      User_TypeID: 2,
      mobile_no:""
    },
    validationSchema: Yup.object({
      // email: Yup
      //   .string()
      //   .email('Must be a valid email')
      //   .max(255)
      //   .required('Email is required'),
      //   password: Yup
      //     .string()
      //     .max(255)
      //     .required('Password is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        console.log({ ...values, username: values.name });
        let finalvalue = {...values, username: values.name }

        SaveUser(finalvalue).then((res)=>{
          if(res){ 
            formik.values.email= "",
            formik.values.password="",
            formik.values.name= "",
            formik.values.gender= ""

            handleClose()
          }
        })
          
      

      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog
      fullWidth
      maxWidth="lg"
      scroll='body'
      onClose={handleClose} open={open}>
      <DialogTitle style={{ textAlign: "center" }}>Create User</DialogTitle>

      <Card sx={{ minWidth: 300 }} style={{ textAlign: "center" }}>
        <CardContent>
          <Paper elevation={0}  >
            <Grid container style={{ textAlign: "center" }}>
              <Grid item xs={12} sm={12} md={12}>

                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Grid sx={{ maxWidth: "90%" }}
                    container
                    style={{ textAlign: "left", margin: "0px" }}
                    spacing={4}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                    justifyContent="center"

                  >
                    {/* <Grid item xs={12} sm={12} md={12}>
                      <Typography variant="h3" component="h2">
                        Property For Rent
                      </Typography>
                    </Grid> */}

                    <Grid item xs={12} sm={12} md={12}>
                    </Grid>

                    <Grid item xs={6} sm={6} md={6}>
                      <TextField
                        variant="standard"
                        // error={!!(formik.touched.email && formik.errors.email)}
                        fullWidth
                        // helperText={formik.touched.email && formik.errors.email}
                        label="Name"
                        name="name"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="Text"
                        value={formik.values.name}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6}>
                      <TextField
                        variant="standard"
                        error={!!(formik.touched.email && formik.errors.email)}
                        fullWidth
                        helperText={formik.touched.email && formik.errors.email}
                        label="Email"
                        name="email"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="Text"
                        value={formik.values.email}
                      />
                    </Grid>

                    <Grid item xs={6} sm={6} md={6}>
                      <TextField
                        variant="standard"
                        error={!!(formik.touched.password && formik.errors.password)}
                        fullWidth
                        helperText={formik.touched.password && formik.errors.password}
                        label="Password"
                        name="password"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="password"
                        value={formik.values.password}
                      />
                    </Grid>

                    <Grid item xs={6} sm={6} md={6}>
                      <TextField
                        variant="standard"
                        error={!!(formik.touched.mobile_no && formik.errors.mobile_no)}
                        fullWidth
                        helperText={formik.touched.mobile_no && formik.errors.mobile_no}
                        label="Mobile No."
                        name="mobile_no"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="Text"
                        value={formik.values.mobile_no}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6}>
                      <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth variant="standard">
                          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={formik.values.gender}
                            label="Gender"
                            name="gender"
                            onChange={formik.handleChange}
                          >
                            <MenuItem value="Male">Men</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>

                    <Grid item xs={6} sm={6} md={6}>
                      <InputLabel id="demo-simple-select-label">Date of Birth</InputLabel>
                      <TextField
                        variant="standard"
                        error={!!(formik.touched.dob && formik.errors.dob)}
                        fullWidth
                        helperText={formik.touched.dob && formik.errors.dob}
                        // label="Date of Birth"
                        name="dob"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="Date"
                        value={formik.values.dob}
                      />
                    </Grid>

                    {/* <Grid item xs={6} sm={6} md={6}>
                      <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth variant="standard">
                          <InputLabel id="demo-simple-select-label">City</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={formik.values.city_id}
                            label="City"
                            name="city_id"
                            onChange={formik.handleChange}
                          >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid> */}

                    {/* <Grid item xs={12} sm={12} md={12} style={{ textAlign: "center" }} ><Button onClick={formik.handleSubmit}>Submit</Button></Grid> */}

                  </Grid>
                </div>

              </Grid>
            </Grid>
          </Paper>
        </CardContent>
      </Card>
      <DialogActions>
        <Button variant="contained" onClick={formik.handleSubmit}>Submit</Button>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>

    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default SimpleDialog;