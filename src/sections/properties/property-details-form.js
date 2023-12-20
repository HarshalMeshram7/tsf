import {
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { FormikContext, useFormik } from "formik";
import * as Yup from "yup";
import { Box } from "@mui/system";
import {
  getPropertyListByID,
  saveProperty,
  getImg,
  getAdminActions,
} from "src/service/propertyRequests";
import { getAppartmentsList, getCityList } from "src/service/locationRequests";
import { getAmenites } from "src/service/userRequests";
import { getProperty_Types } from "src/service/property_type";
import { getBuildingType } from "src/service/property_type";
import moment from "moment";
import { getLocalitiesList } from "src/service/locality";
import { Scrollbar } from "src/components/scrollbar";
import RejectFormDialog from "./rejectFormdialogue";
import { useSnackbar } from "notistack";
import { handlePriview } from "../../utils/azureBlob";
import { saveImageApi } from "src/service/propertyRequests";
import PostForm7 from "src/components/ImageUploderPropertyDetails";

function PropertyDetailsForm({ propertyid }) {
  const [isdisable, setIsdisable] = useState(true);
  const [cities, setCities] = useState([]);
  const [amenitesList, setAmenitesList] = useState([]);

  const [propertyTypes, setPropertyTypes] = useState([]);
  const [propertyFor, setPropertyFor] = useState([]);
  const [isEditing, setIsEditing] = useState(true);

  const [showFloorList, setShowFloorList] = useState();
  const [floorChange, setFloorChange] = useState();
  const [number, setNumber] = useState();
  const [options, setOptions] = useState([]);

  const [localities, setLocalities] = useState([]);
  const [appartments, setAppartments] = useState([]);

  const [uploadedPropertyImageName, setUploadedPropertyImageName] = useState([]);

  const handlefloorChange = (event) => {
    const selectedValue = event.target.value;
    setFloorChange(selectedValue);
    setShowFloorList(selectedValue !== "");
  };

  const handleNumberChange = (event) => {
    const value = event.target.value;
    setNumber(value);

    // Generate options based on the input number
    const newOptions = [];
    for (let i = 1; i <= value; i++) {
      newOptions.push(i);
    }
    setOptions(newOptions);
  };

  const handleDisable = () => {
    setIsdisable(false);
    setIsEditing(!isEditing);
  };

  const [propertyDetails, setPropertyDetails] = useState({});
  const [rejectModal, setRejectModal] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [adminActionList, setAdminActionList] = useState([]);

  useEffect(() => {
    getCityList().then((res) => {
      setCities(res);
    });

    getAmenites().then((res) => {
      setAmenitesList(res);
    });
    getProperty_Types().then((res) => {
      setPropertyFor(res);
    });

    getBuildingType().then((res) => {
      setPropertyTypes(res);
    });
  }, []);

  const handleCityChaange = () => {
    // for localities list
    getLocalitiesList({ city_id: propertyDetails.city_id }).then((res) => {
      setLocalities(res);
    });
    //appartment-list
    getAppartmentsList({ city_id: propertyDetails.city_id }).then((res) => {
      setAppartments(res);
    });
  };
  const getPropertyDetails = () => {
    getPropertyListByID({ id: propertyid }).then((res) => {
      setPropertyDetails(res);
    });
  };
  const getAdminActionsFun = () => {
    getAdminActions({ propertyID: propertyid }).then((res) => {
      setAdminActionList(res);
    });
  };
  const getPropertyImages =()=>{
    getImg({propertyID:propertyid}).then((res) => {
      if(res){
        setUploadedPropertyImageName(res)
      }
    });
  }
  useEffect(() => {
    getPropertyDetails();
    //   getAdminActionsFun()
    getPropertyImages()
  }, [propertyid]);

  useEffect(() => {
    if (propertyDetails.city_id) {
      handleCityChaange();
    }
  }, [propertyDetails.city_id]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: propertyid,
      email: propertyDetails.email || "",
      mobile_no: propertyDetails.mobile_no || "",
      // date: propertyDetails.possestion_date || "",
      city_id: propertyDetails.city_id || "",
      property_for: propertyDetails.property_types_id || "",
      city: propertyDetails.city || "",
      // property_types_id: propertyDetails.property_types_id || "",
      building_types_id: propertyDetails.building_types_id || "",
      locality_id: propertyDetails.locality_id || "",
      bhk_type: propertyDetails.bhk_type || "",
      carpet_area: propertyDetails.carpet_area || "",
      builtup_area: propertyDetails.builtup_area || "",
      possestion_date: moment(propertyDetails.possestion_date).utc().format("YYYY-MM-DD") || "",
      floor_total: propertyDetails.floor_total || "",
      floor_no: propertyDetails.floor_no || "",
      price: propertyDetails.price || "",
      token_amount: propertyDetails.token_amount || "",
      maintainance_cost: propertyDetails.maintainance_cost || "",
      price_negotiable: propertyDetails.price_negotiable || "",
      under_loan: propertyDetails.under_loan || "",
      number_bathroom: propertyDetails.number_bathroom || "",
      number_balconies: propertyDetails.number_balconies || "",
      furnish_type: propertyDetails.furnish_type || "",
      rent_amount: propertyDetails.rent_amount || "",
      rent_deposite: propertyDetails.rent_deposite || "",
      coverd_parking: propertyDetails.coverd_parking || "",
      open_parking: propertyDetails.open_parking || "",
      kitchen_type: propertyDetails.kitchen_type || "",
      water_supply: propertyDetails.water_supply || "",
      flooring_type: propertyDetails.flooring_type || "",
      eating_habits: propertyDetails.eating_habits || "",
      property_facing: propertyDetails.property_facing || "",
      amenites: propertyDetails.amenites || "",
      description: propertyDetails.description || "",
      agreement_duration: propertyDetails.agreement_duration || "",
      who_will_show: propertyDetails.who_will_show || "",
      prefered_tenants: propertyDetails.prefered_tenants || "",
      plot_area: propertyDetails.plot_area || "",
      readytomove_underconstruction: propertyDetails.readytomove_underconstruction || "",
      //
      property_age: propertyDetails.property_age || "",
      apartment_id: propertyDetails.apartment_id || "",
      reject_reason: propertyDetails.reject_reason || "",

      //   submit: null
    },

    validationSchema: Yup.object({
      //   email: Yup
      //     .string()
      //     .email('Must be a valid email')
      //     .max(255)
      //     .required('Email is required'),
      //   password: Yup
      //     .string()
      //     .max(255)
      //     .required('Password is required')
    }),

    onSubmit: async (values, helpers) => {
      try {
        console.log(values);
        saveProperty({ ...values, property_types_id: values.property_for }).then(() => {
          getPropertyDetails();
          enqueueSnackbar("Property Edit Successfully", { variant: "success" });
        });
        uploadedPropertyImageName.map(async (propertyImage, key) => {
          await saveImageApi({
            id: propertyImage.id,
            property_id: values.id,
            img_name: propertyImage.img_name,
            src: handlePriview(propertyImage.img_name),
            thumbnail: handlePriview(propertyImage.img_name),
            img_index: key,
          }).then((imageRes) => {
            console.log("image added", imageRes);
          });
        });
        setIsdisable(true);
        setIsEditing(true);
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  const handleStatusChangeButton = (statusID) => {
    if (statusID == 4) {
      saveProperty({
        ...propertyDetails,
        property_statusID: statusID,
        reject_reason: formik.values.reject_reason,
      }).then(() => {
        getPropertyDetails();
        setRejectModal(false);
        enqueueSnackbar("Property Rejected", { variant: "error" });
      });
    } else if (statusID == 2) {
      saveProperty({
        ...propertyDetails,
        property_statusID: statusID,
        reject_reason: formik.values.reject_reason,
      }).then(() => {
        getPropertyDetails();
        setRejectModal(false);
        enqueueSnackbar("Property InActive", { variant: "warning" });
      });
    } else if (statusID == 3) {
      saveProperty({
        ...propertyDetails,
        property_statusID: statusID,
        reject_reason: formik.values.reject_reason,
      }).then(() => {
        getPropertyDetails();
        setRejectModal(false);
        enqueueSnackbar("Property Mark as Pending", { variant: "warning" });
      });
    } else {
      saveProperty({ ...propertyDetails, property_statusID: statusID }).then(() => {
        getPropertyDetails();
        enqueueSnackbar("Property Active", { variant: "success" });
      });
    }
  };

  return (
    <>
      <RejectFormDialog
        open={rejectModal}
        setOpen={setRejectModal}
        handleReject={handleStatusChangeButton}
        formik={formik}
      />
      <Card sx={{ minWidth: 300 }} style={{ textAlign: "center" }}>
        <CardContent>
          <Paper elevation={0}>
            <Grid container style={{ textAlign: "center" }}>
              <Grid item xs={12} sm={12} md={12}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Grid
                    sx={{ maxWidth: "90%" }}
                    container
                    style={{ textAlign: "left", margin: "0px" }}
                    spacing={4}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                    justifyContent="center"
                  >
                    <Grid item xs={12} sm={12} md={12}>
                      <Typography variant="h3" component="h2" style={{ textAlign: "center" }}>
                        Property Details
                      </Typography>
                    </Grid>
                    {/* Property For */}
                    <Grid item xs={12} sm={12} md={12}>
                      <FormControl>
                        <FormLabel
                          disabled={isdisable}
                          variant="standard"
                          id="demo-radio-buttons-group-label"
                          error={!!(formik.touched.property_for && formik.errors.property_for)}
                          fullWidth
                          helperText={formik.touched.property_for && formik.errors.property_for}
                        >
                          Property For
                        </FormLabel>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          name="property_for"
                          disabled={isdisable}
                          value={formik.values.property_for}
                          onChange={(event) => formik.handleChange(event)}
                        >
                          {propertyFor?.map((propertyFor, index) => (
                            <FormControlLabel
                              key={index}
                              value={propertyFor.id}
                              control={<Radio />}
                              label={propertyFor.name}
                              disabled={isdisable}
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    {/* Mobile No */}
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
                        disabled={isdisable}
                      />
                    </Grid>
                    {/*AvailableFrom For Rent */}
                    {formik.values.property_for == 2 && (
                      <Grid item xs={6} sm={6} md={6}>
                        <TextField
                          disabled={isdisable}
                          variant="standard"
                          error={
                            !!(formik.touched.possestion_date && formik.errors.possestion_date)
                          }
                          fullWidth
                          helperText={
                            formik.touched.possestion_date && formik.errors.possestion_date
                          }
                          label="AvailableFrom"
                          name="possestion_date"
                          placeholder="AvailableFrom"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          type="date"
                          value={formik.values.possestion_date}
                        />
                      </Grid>
                    )}
                    {/* City */}
                    <Grid item xs={6} sm={6} md={6}>
                      <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth variant="standard">
                          <InputLabel
                            variant="standard"
                            error={!!(formik.touched.city_id && formik.errors.city_id)}
                            fullWidth
                            helperText={formik.touched.city_id && formik.errors.city_id}
                            id="demo-simple-select-label"
                          >
                            City
                          </InputLabel>
                          <Select
                            disabled={isdisable}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={formik.values.city_id}
                            label="City"
                            onChange={(event) => {
                              handleCityChaange(event);
                              formik.setFieldValue("city_id", event.target.value);
                            }}
                          >
                            {cities?.map((city, index) => (
                              <MenuItem key={index} value={city.id}>
                                {city.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                    {/* Locality */}
                    {formik.values.city_id && (
                      <Grid item xs={6} sm={6} md={6}>
                        <Box sx={{ minWidth: 120 }}>
                          <FormControl fullWidth variant="standard">
                            <InputLabel
                              id="demo-simple-select-label"
                              error={!!(formik.touched.locality_id && formik.errors.locality_id)}
                              fullWidth
                              helperText={formik.touched.locality_id && formik.errors.locality_id}
                            >
                              Select Locality
                            </InputLabel>
                            <Select
                              disabled={isdisable}
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={formik.values.locality_id}
                              label="Select Locality"
                              onChange={(event) =>
                                formik.setFieldValue("locality_id", event.target.value)
                              }
                            >
                              {localities?.map((localities, index) => (
                                <MenuItem key={index} value={localities.id}>
                                  {localities.locality_name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                      </Grid>
                    )}
                    {/* Appartment */}
                    {formik.values.locality_id && (
                      <Grid item xs={6} sm={6} md={6}>
                        <Box sx={{ minWidth: 120 }}>
                          <FormControl fullWidth variant="standard">
                            <InputLabel
                              id="demo-simple-select-label"
                              error={!!(formik.touched.apartment_id && formik.errors.apartment_id)}
                              fullWidth
                              helperText={formik.touched.apartment_id && formik.errors.apartment_id}
                            >
                              Select Apartment
                            </InputLabel>
                            <Select
                              disabled={isdisable}
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={formik.values.apartment_id}
                              label="Select Apartment"
                              onChange={(event) =>
                                formik.setFieldValue("apartment_id", event.target.value)
                              }
                            >
                              {appartments?.map((appartments, index) => (
                                <MenuItem key={index} value={appartments.id}>
                                  {appartments.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                      </Grid>
                    )}
                    {/* Building Type */}
                    <Grid item xs={6} sm={6} md={6}>
                      <FormControl>
                        <FormLabel
                          variant="standard"
                          id="demo-radio-buttons-group-label"
                          error={
                            !!(formik.touched.building_types_id && formik.errors.building_types_id)
                          }
                          fullWidth
                          helperText={
                            formik.touched.building_types_id && formik.errors.building_types_id
                          }
                          disabled={isdisable}
                        >
                          Building Type
                        </FormLabel>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          name="building_types_id"
                          value={formik.values.building_types_id}
                          onChange={(event) => formik.handleChange(event)}
                        >
                          {propertyTypes?.map((propertyTypes, index) => (
                            <FormControlLabel
                              key={index}
                              value={propertyTypes.id}
                              control={<Radio />}
                              disabled={isdisable}
                              label={propertyTypes.name}
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    {/* BHK Type */}
                    <Grid item xs={6} sm={6} md={6}>
                      <FormControl>
                        <FormLabel
                          variant="standard"
                          error={!!(formik.touched.bhk_type && formik.errors.bhk_type)}
                          fullWidth
                          helperText={formik.touched.bhk_type && formik.errors.bhk_type}
                          id="demo-radio-buttons-group-label"
                          disabled={isdisable}
                        >
                          BHK Type
                        </FormLabel>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          value={formik.values.bhk_type}
                          onChange={(event) => formik.setFieldValue("bhk_type", event.target.value)}
                          name="radio-buttons-group"
                        >
                          <Grid container style={{ textAlign: "left" }}>
                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel
                                disabled={isdisable}
                                value="1BHK"
                                control={<Radio />}
                                label="BHK1"
                              />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel
                                disabled={isdisable}
                                value="2BHK"
                                control={<Radio />}
                                label="BHK2"
                              />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel
                                disabled={isdisable}
                                value="3BHK"
                                control={<Radio />}
                                label="BHK3"
                              />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel
                                disabled={isdisable}
                                value="4BHK"
                                control={<Radio />}
                                label="BHK4"
                              />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel
                                disabled={isdisable}
                                value="RK"
                                control={<Radio />}
                                label="RK"
                              />
                            </Grid>
                          </Grid>
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    {/* Ploat Area if property types Independent  */}
                    <Grid item xs={6} sm={6} md={6}>
                      <TextField
                        disabled={isdisable}
                        variant="standard"
                        error={!!(formik.touched.plot_area && formik.errors.plot_area)}
                        fullWidth
                        helperText={formik.touched.plot_area && formik.errors.plot_area}
                        label="Ploat Area"
                        name="plot_area"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="Text"
                        value={formik.values.plot_area}
                      />
                    </Grid>
                    {/* Carpet Area */}
                    <Grid item xs={6} sm={6} md={6}>
                      <TextField
                        variant="standard"
                        error={!!(formik.touched.carpet_area && formik.errors.carpet_area)}
                        fullWidth
                        helperText={formik.touched.carpet_area && formik.errors.carpet_area}
                        label="Carpet Area"
                        name="carpet_area"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="Text"
                        disabled={isdisable}
                        value={formik.values.carpet_area}
                      />
                    </Grid>
                    {/* Built Area */}
                    <Grid item xs={6} sm={6} md={6}>
                      <TextField
                        variant="standard"
                        error={!!(formik.touched.builtup_area && formik.errors.builtup_area)}
                        fullWidth
                        helperText={formik.touched.builtup_area && formik.errors.builtup_area}
                        label="Built Area"
                        name="builtup_area"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="Text"
                        disabled={isdisable}
                        value={formik.values.builtup_area}
                      />
                    </Grid>
                    {/* Total Floors */}
                    <Grid item xs={6} sm={6} md={6}>
                      <TextField
                        disabled={isdisable}
                        variant="standard"
                        type="number"
                        error={!!(formik.touched.floor_total && formik.errors.floor_total)}
                        fullWidth
                        helperText={formik.touched.floor_total && formik.errors.floor_total}
                        label="Total Floors"
                        value={formik.values.floor_total}
                        name="floor_total"
                        onBlur={formik.handleBlur}
                        onChange={(event) => {
                          const totalFloors = parseInt(event.target.value, 10);
                          formik.setFieldValue(
                            "floor_total",
                            isNaN(totalFloors) ? null : totalFloors
                          );
                          formik.handleChange(event);
                          handlefloorChange(event);
                          handleNumberChange(event);

                          if (isNaN(totalFloors)) {
                            // Clear floor_no if totalFloors is NaN
                            formik.setFieldValue("floor_no", null);
                          } else {
                            // Ensure floor_total is updated
                            const floorNumbers = Array.from(
                              { length: totalFloors },
                              (_, index) => index + 1
                            );
                            formik.setFieldValue("floor_no", floorNumbers[0]);
                          }
                        }}
                      />
                    </Grid>
                    {/* Select-floor number of floors */}
                    {formik.values.floor_total && (
                      <Grid item xs={6} sm={6} md={6}>
                        <Box sx={{ minWidth: 120 }}>
                          <FormControl fullWidth variant="standard">
                            <InputLabel
                              id="demo-simple-select-label"
                              error={!!(formik.touched.floor_no && formik.errors.floor_no)}
                              fullWidth
                              helperText={formik.touched.floor_no && formik.errors.floor_no}
                            >
                              Select-floor
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={formik.values.floor_no === null ? "" : formik.values.floor_no}
                              label="Select"
                              name="floor_no"
                              onBlur={formik.handleBlur}
                              onChange={(event) =>
                                formik.setFieldValue("floor_no", event.target.value)
                              }
                              placeholder="Select Floor"
                              disabled={isdisable}
                            >
                              <MenuItem value="">Select</MenuItem>
                              <MenuItem value="1">Under-Ground</MenuItem>
                              <MenuItem value="2">Lower-Ground</MenuItem>
                              <MenuItem value="3">Ground</MenuItem>

                              {options.map((option) => (
                                <MenuItem key={option} value={3 + option} disabled={isdisable}>
                                  Floor No {option}
                                </MenuItem>
                              ))}
                            </Select>
                            <span className="formik-validation">
                              {formik.touched.floor_no && formik.errors.floor_no}
                            </span>
                          </FormControl>
                        </Box>
                      </Grid>
                    )}
                    {/* Property Price */}
                    <Grid item xs={6} sm={6} md={6}>
                      <TextField
                        variant="standard"
                        disabled={isdisable}
                        error={!!(formik.touched.price && formik.errors.price)}
                        fullWidth
                        helperText={formik.touched.price && formik.errors.price}
                        label="Property Price"
                        name="price"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="Text"
                        value={formik.values.price}
                      />
                    </Grid>
                    {/* Token Amount / Deposit */}
                    <Grid item xs={6} sm={6} md={6}>
                      <TextField
                        variant="standard"
                        disabled={isdisable}
                        error={!!(formik.touched.token_amount && formik.errors.token_amount)}
                        fullWidth
                        helperText={formik.touched.token_amount && formik.errors.token_amount}
                        label={formik.values.property_for === 1 ? "Token Amount" : "Deposit Amount"}
                        name="token_amount"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="Text"
                        value={formik.values.token_amount}
                      />
                    </Grid>
                    {/* Ready To Move / Under Construction */}
                    {formik.values.property_for == 1 && (
                      <Grid item xs={6} sm={6} md={6}>
                        <FormControl>
                          <FormLabel
                            error={
                              !!(
                                formik.touched.readytomove_underconstruction &&
                                formik.errors.readytomove_underconstruction
                              )
                            }
                            fullWidth
                            helperText={
                              formik.touched.readytomove_underconstruction &&
                              formik.errors.readytomove_underconstruction
                            }
                            id="demo-radio-buttons-group-label"
                          >
                            Property Details
                          </FormLabel>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="readytomove_underconstruction"
                            value={formik.values.readytomove_underconstruction} // Set the value to the formik field
                            onChange={(event) =>
                              formik.setFieldValue(
                                "readytomove_underconstruction",
                                event.target.value
                              )
                            }
                          >
                            <FormControlLabel
                              value={1}
                              disabled={isdisable}
                              control={<Radio />}
                              label="Ready To Move"
                            />
                            <FormControlLabel
                              disabled={isdisable}
                              value={2}
                              control={<Radio />}
                              label="Under Construction"
                            />
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                    )}
                    {/* Property Age if Ready to move */}
                    {formik.values.property_for == 1 && (
                      <>
                        {formik.values.readytomove_underconstruction == 1 && (
                          <Grid item xs={6} sm={6} md={6}>
                            <FormControl fullWidth variant="standard">
                              <InputLabel
                                disabled={isdisable}
                                error={
                                  !!(formik.touched.property_age && formik.errors.property_age)
                                }
                                fullWidth
                                helperText={
                                  formik.touched.property_age && formik.errors.property_age
                                }
                                id="demo-simple-select-label"
                              >
                                Select Property Age
                              </InputLabel>
                              <Select
                                disabled={isdisable}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={formik.values.property_age} // Set the value to the formik field
                                onChange={(event) =>
                                  formik.setFieldValue("property_age", event.target.value)
                                }
                                label="Select"
                              >
                                <MenuItem value={1}>Less than 1 Year Old</MenuItem>
                                <MenuItem value={2}>1 Year Old</MenuItem>
                                <MenuItem value={3}>2 Year Old</MenuItem>
                                <MenuItem value={4}>3 Year Old</MenuItem>
                                <MenuItem value={5}>4 Year Old</MenuItem>
                                <MenuItem value={6}>5 Year Old</MenuItem>
                                <MenuItem value={7}>6 Year Old</MenuItem>
                                <MenuItem value={8}>7 Year Old</MenuItem>
                                <MenuItem value={9}>8 Year Old</MenuItem>
                                <MenuItem value={10}>9 Year Old</MenuItem>
                                <MenuItem value={11}>10 Year Old</MenuItem>
                                <MenuItem value={12}>Between 10-15 Years Old</MenuItem>
                                <MenuItem value={13}>Between 15-20 Years Old</MenuItem>
                                <MenuItem value={14}>Between 20-30 Years Old</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                        )}
                        {/* Possession-Date in Under Const*/}
                        {formik.values.readytomove_underconstruction == 2 && (
                          <Grid item xs={6} sm={6} md={6}>
                            <FormLabel variant="standard" fullWidth>
                              Possession From
                              <TextField
                                variant="standard"
                                error={
                                  !!(
                                    formik.touched.possestion_date && formik.errors.possestion_date
                                  )
                                }
                                fullWidth
                                helperText={
                                  formik.touched.possestion_date && formik.errors.possestion_date
                                }
                                name="possestion_date"
                                placeholder="AvailableFrom"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="date"
                                value={formik.values.possestion_date}
                              />
                            </FormLabel>
                          </Grid>
                        )}
                      </>
                    )}
                    {/* Maintainance Charges */}
                    <Grid item xs={6} sm={6} md={6}>
                      <TextField
                        variant="standard"
                        error={
                          !!(formik.touched.maintainance_cost && formik.errors.maintainance_cost)
                        }
                        fullWidth
                        helperText={
                          formik.touched.maintainance_cost && formik.errors.maintainance_cost
                        }
                        label="Maintainance Charges (Monthly)"
                        name="maintainance_cost"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="Text"
                        disabled={isdisable}
                        value={formik.values.maintainance_cost}
                      />
                    </Grid>
                    {/* Price Negotiable/Currently UnderLoan */}
                    <Grid item xs={6} sm={6} md={6}>
                      <div>
                        <Checkbox
                          disabled={isdisable}
                          checked={formik.values.price_negotiable}
                          onChange={(event) =>
                            formik.setFieldValue("price_negotiable", event.target.checked)
                          }
                          error={
                            !!(formik.touched.price_negotiable && formik.errors.price_negotiable)
                          }
                          fullWidth
                          helperText={
                            formik.touched.price_negotiable && formik.errors.price_negotiable
                          }
                        />
                        Price Negotiable
                      </div>
                      <div>
                        <Checkbox
                          disabled={isdisable}
                          checked={formik.values.under_loan}
                          onChange={(event) =>
                            formik.setFieldValue("under_loan", event.target.checked)
                          }
                          error={!!(formik.touched.under_loan && formik.errors.under_loan)}
                          fullWidth
                          helperText={formik.touched.under_loan && formik.errors.under_loan}
                        />
                        Currently UnderLoan
                      </div>
                    </Grid>
                    {/* Total Bathrooms */}
                    <Grid item xs={6} sm={6} md={6}>
                      <FormControl>
                        <FormLabel
                          error={
                            !!(formik.touched.number_bathroom && formik.errors.number_bathroom)
                          }
                          fullWidth
                          helperText={
                            formik.touched.number_bathroom && formik.errors.number_bathroom
                          }
                          id="demo-radio-buttons-group-label"
                          disabled={isdisable}
                        >
                          Total Bathrooms
                        </FormLabel>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          name="number_bathroom"
                          value={formik.values.number_bathroom} // Set the value to the formik field
                          onChange={(event) =>
                            formik.setFieldValue("number_bathroom", event.target.value)
                          }
                        >
                          <Grid container>
                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel
                                disabled={isdisable}
                                value={1}
                                control={<Radio />}
                                label="1"
                              />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel
                                disabled={isdisable}
                                value={2}
                                control={<Radio />}
                                label="2"
                              />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel
                                disabled={isdisable}
                                value={3}
                                control={<Radio />}
                                label="3"
                              />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel
                                disabled={isdisable}
                                value={4}
                                control={<Radio />}
                                label="4"
                              />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel
                                disabled={isdisable}
                                value={5}
                                control={<Radio />}
                                label="5+"
                              />
                            </Grid>
                          </Grid>
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    {/* Total Balcony */}
                    <Grid item xs={6} sm={6} md={6}>
                      <FormControl>
                        <FormLabel
                          error={
                            !!(formik.touched.number_balconies && formik.errors.number_balconies)
                          }
                          fullWidth
                          helperText={
                            formik.touched.number_balconies && formik.errors.number_balconies
                          }
                          id="demo-radio-buttons-group-label"
                          disabled={isdisable}
                        >
                          Total Balcony
                        </FormLabel>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          name="number_balconies"
                          value={formik.values.number_balconies} // Set the value to the formik field
                          onChange={(event) =>
                            formik.setFieldValue("number_balconies", event.target.value)
                          }
                        >
                          <Grid container>
                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel
                                disabled={isdisable}
                                value={1}
                                control={<Radio />}
                                label="1"
                              />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel
                                disabled={isdisable}
                                value={2}
                                control={<Radio />}
                                label="2"
                              />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel
                                disabled={isdisable}
                                value={3}
                                control={<Radio />}
                                label="3"
                              />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel
                                disabled={isdisable}
                                value={4}
                                control={<Radio />}
                                label="4"
                              />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel
                                disabled={isdisable}
                                value={5}
                                control={<Radio />}
                                label="5+"
                              />
                            </Grid>
                          </Grid>
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    <br />
                    {/* Furnish Type */}
                    <Grid item xs={6} sm={6} md={6}>
                      <FormControl>
                        <FormLabel
                          error={!!(formik.touched.furnish_type && formik.errors.furnish_type)}
                          fullWidth
                          helperText={formik.touched.furnish_type && formik.errors.furnish_type}
                          id="demo-radio-buttons-group-label"
                        >
                          Furnish Type
                        </FormLabel>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          name="furnish_type"
                          value={formik.values.furnish_type} // Set the value to the formik field
                          onChange={(event) =>
                            formik.setFieldValue("furnish_type", event.target.value)
                          }
                        >
                          <Grid container style={{ textAlign: "left" }}>
                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel
                                disabled={isdisable}
                                value="furnished"
                                control={<Radio />}
                                label="Furnished"
                              />
                            </Grid>

                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel
                                disabled={isdisable}
                                value="semifurnished"
                                control={<Radio />}
                                label="Semi Furnished"
                              />
                            </Grid>

                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel
                                disabled={isdisable}
                                value="unfurnished"
                                control={<Radio />}
                                label="Unfurnished"
                              />
                            </Grid>
                          </Grid>
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    {/* Rent Amount */}
                    {formik.values.property_for == 2 && (
                      <Grid item xs={6} sm={6} md={6}>
                        <TextField
                          disabled={isdisable}
                          variant="standard"
                          error={!!(formik.touched.rent_amount && formik.errors.rent_amount)}
                          fullWidth
                          helperText={formik.touched.rent_amount && formik.errors.rent_amount}
                          label="Rent Amount"
                          name="rent_amount"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          type="Text"
                          value={formik.values.rent_amount}
                        />
                      </Grid>
                    )}
                    {/* Cover Parking */}
                    <Grid item xs={6} sm={6} md={6}>
                      <FormControl>
                        <FormLabel
                          error={!!(formik.touched.coverd_parking && formik.errors.coverd_parking)}
                          fullWidth
                          helperText={formik.touched.coverd_parking && formik.errors.coverd_parking}
                          id="demo-radio-buttons-group-label"
                          disabled={isdisable}
                        >
                          Cover Parking
                        </FormLabel>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          name="coverd_parking"
                          value={formik.values.coverd_parking} // Set the value to the formik field
                          onChange={(event) =>
                            formik.setFieldValue("coverd_parking", event.target.value)
                          }
                        >
                          <Grid container style={{ textAlign: "left" }}>
                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel
                                disabled={isdisable}
                                value={1}
                                control={<Radio />}
                                label="1"
                              />
                            </Grid>

                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel
                                disabled={isdisable}
                                value={2}
                                control={<Radio />}
                                label="2"
                              />
                            </Grid>

                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel
                                disabled={isdisable}
                                value={3}
                                control={<Radio />}
                                label="3"
                              />
                            </Grid>

                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel
                                disabled={isdisable}
                                value={4}
                                control={<Radio />}
                                label="4"
                              />
                            </Grid>

                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel
                                disabled={isdisable}
                                value={5}
                                control={<Radio />}
                                label="5"
                              />
                            </Grid>
                          </Grid>
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    {/* Open Parking */}
                    <Grid item xs={6} sm={6} md={6}>
                      <FormControl>
                        <FormLabel
                          error={!!(formik.touched.open_parking && formik.errors.open_parking)}
                          fullWidth
                          helperText={formik.touched.open_parking && formik.errors.open_parking}
                          id="demo-radio-buttons-group-label"
                          disabled={isdisable}
                        >
                          Open Parking
                        </FormLabel>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          name="open_parking"
                          value={formik.values.open_parking} // Set the value to the formik field
                          onChange={(event) =>
                            formik.setFieldValue("open_parking", event.target.value)
                          }
                        >
                          <Grid container style={{ textAlign: "left" }}>
                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel
                                disabled={isdisable}
                                value={1}
                                control={<Radio />}
                                label="1"
                              />
                            </Grid>

                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel
                                disabled={isdisable}
                                value={2}
                                control={<Radio />}
                                label="2"
                              />
                            </Grid>

                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel
                                disabled={isdisable}
                                value={3}
                                control={<Radio />}
                                label="3"
                              />
                            </Grid>

                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel
                                disabled={isdisable}
                                value={4}
                                control={<Radio />}
                                label="4"
                              />
                            </Grid>

                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel
                                disabled={isdisable}
                                value={5}
                                control={<Radio />}
                                label="5"
                              />
                            </Grid>
                          </Grid>
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    {/* Kitchen Type */}
                    <Grid item xs={6} sm={6} md={6}>
                      <FormControl>
                        <FormLabel
                          disabled={isdisable}
                          error={!!(formik.touched.kitchen_type && formik.errors.kitchen_type)}
                          fullWidth
                          helperText={formik.touched.kitchen_type && formik.errors.kitchen_type}
                          id="demo-radio-buttons-group-label"
                        >
                          Kitchen Type
                        </FormLabel>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          name="kitchen_type"
                          value={formik.values.kitchen_type} // Set the value to the formik field
                          onChange={(event) =>
                            formik.setFieldValue("kitchen_type", event.target.value)
                          }
                        >
                          <Grid container style={{ textAlign: "left" }}>
                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel
                                disabled={isdisable}
                                value="Modular"
                                control={<Radio />}
                                label="Modular"
                              />
                            </Grid>

                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel
                                disabled={isdisable}
                                value="Covered Shelves"
                                control={<Radio />}
                                label="Covered Shelves"
                              />
                            </Grid>

                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel
                                disabled={isdisable}
                                value="Open Shelves"
                                control={<Radio />}
                                label="Open Shelves"
                              />
                            </Grid>
                          </Grid>
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    {/* Water Supply */}
                    <Grid item xs={6} sm={6} md={6}>
                      <FormControl>
                        <FormLabel
                          error={!!(formik.touched.water_supply && formik.errors.water_supply)}
                          fullWidth
                          helperText={formik.touched.water_supply && formik.errors.water_supply}
                          id="demo-radio-buttons-group-label"
                          disabled={isdisable}
                        >
                          Water Supply
                        </FormLabel>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          name="water_supply"
                          value={formik.values.water_supply} // Set the value to the formik field
                          onChange={(event) =>
                            formik.setFieldValue("water_supply", event.target.value)
                          }
                        >
                          <Grid container style={{ textAlign: "left" }}>
                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel
                                disabled={isdisable}
                                value={1}
                                control={<Radio />}
                                label="Corporation"
                              />
                            </Grid>

                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel
                                disabled={isdisable}
                                value={2}
                                control={<Radio />}
                                label="Boring"
                              />
                            </Grid>

                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel
                                disabled={isdisable}
                                value={3}
                                control={<Radio />}
                                label="Both"
                              />
                            </Grid>
                          </Grid>
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    {/* Flooring Type */}
                    <Grid item xs={6} sm={6} md={6}>
                      <FormControl>
                        <FormLabel
                          error={!!(formik.touched.flooring_type && formik.errors.flooring_type)}
                          fullWidth
                          helperText={formik.touched.flooring_type && formik.errors.flooring_type}
                          id="demo-radio-buttons-group-label"
                          disabled={isdisable}
                        >
                          Flooring Type
                        </FormLabel>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          name="flooring_type"
                          value={formik.values.flooring_type} // Set the value to the formik field
                          onChange={(event) =>
                            formik.setFieldValue("flooring_type", event.target.value)
                          }
                        >
                          <Grid container style={{ textAlign: "left" }}>
                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel
                                disabled={isdisable}
                                value="Marbel"
                                control={<Radio />}
                                label="Marbel"
                              />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel
                                disabled={isdisable}
                                value="Concrete"
                                control={<Radio />}
                                label="Concrete"
                              />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel
                                disabled={isdisable}
                                value="Stone"
                                control={<Radio />}
                                label="Stone"
                              />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel
                                disabled={isdisable}
                                value="Wood"
                                control={<Radio />}
                                label="Wood"
                              />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel
                                value="Granite"
                                disabled={isdisable}
                                control={<Radio />}
                                label="Granite"
                              />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel
                                disabled={isdisable}
                                value="Cement"
                                control={<Radio />}
                                label="Cement"
                              />
                            </Grid>
                          </Grid>
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    {/* Eating Habits */}
                    {formik.values.property_for == 2 && (
                      <Grid item xs={6} sm={6} md={6}>
                        <FormControl>
                          <FormLabel
                            disabled={isdisable}
                            error={!!(formik.touched.eating_habits && formik.errors.eating_habits)}
                            fullWidth
                            helperText={formik.touched.eating_habits && formik.errors.eating_habits}
                            id="demo-radio-buttons-group-label"
                          >
                            Eating Habits
                          </FormLabel>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            value={formik.values.eating_habits}
                            onChange={(event) =>
                              formik.setFieldValue("eating_habits", event.target.value)
                            }
                            name="radio-buttons-group"
                          >
                            <Grid container style={{ textAlign: "left" }}>
                              <Grid item xs={6} sm={6} md={6}>
                                <FormControlLabel
                                  disabled={isdisable}
                                  value="Veg"
                                  control={<Radio />}
                                  label="Veg"
                                />
                              </Grid>
                              <Grid item xs={6} sm={6} md={6}>
                                <FormControlLabel
                                  disabled={isdisable}
                                  value="Non-Veg"
                                  control={<Radio />}
                                  label="Non-Veg"
                                />
                              </Grid>
                              <Grid item xs={6} sm={6} md={6}>
                                <FormControlLabel
                                  disabled={isdisable}
                                  value="Doesn't Matter"
                                  control={<Radio />}
                                  label="Doesn't Matter"
                                />
                              </Grid>
                            </Grid>
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                    )}
                    {/* Property Facing */}
                    <Grid item xs={6} sm={6} md={6}>
                      <FormControl>
                        <FormLabel
                          error={
                            !!(formik.touched.property_facing && formik.errors.property_facing)
                          }
                          fullWidth
                          helperText={
                            formik.touched.property_facing && formik.errors.property_facing
                          }
                          id="demo-radio-buttons-group-label"
                          disabled={isdisable}
                        >
                          Property Facing
                        </FormLabel>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          name="property_facing"
                          value={formik.values.property_facing} // Set the value to the formik field
                          onChange={(event) =>
                            formik.setFieldValue("property_facing", event.target.value)
                          }
                        >
                          <Grid container style={{ textAlign: "left" }}>
                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel
                                disabled={isdisable}
                                value="East"
                                control={<Radio />}
                                label="East"
                              />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel
                                disabled={isdisable}
                                value="West"
                                control={<Radio />}
                                label="West"
                              />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel
                                disabled={isdisable}
                                value="North"
                                control={<Radio />}
                                label="North"
                              />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel
                                disabled={isdisable}
                                value="South"
                                control={<Radio />}
                                label="South"
                              />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel
                                disabled={isdisable}
                                value="North East"
                                control={<Radio />}
                                label="North East"
                              />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel
                                disabled={isdisable}
                                value="South East"
                                control={<Radio />}
                                label="South East"
                              />
                            </Grid>
                          </Grid>
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    {/* Other Amenities */}
                    <Grid item xs={12} sm={12} md={12}>
                      <FormLabel
                        error={!!(formik.touched.amenites && formik.errors.amenites)}
                        fullWidth
                        helperText={formik.touched.amenites && formik.errors.amenites}
                        id="demo-radio-buttons-group-label"
                        disabled={isdisable}
                      >
                        Other Amenities
                      </FormLabel>
                      <div>
                        <Grid container style={{ textAlign: "left" }}>
                          {amenitesList?.map((amenity) => (
                            <Grid item xs={3} sm={3} md={3} key={amenity.id}>
                              <Checkbox
                                disabled={isdisable}
                                checked={formik.values.amenites?.includes(amenity.id) || false}
                                value={amenity.id}
                                onChange={() => {
                                  const isChecked =
                                    formik.values.amenites?.includes(amenity.id) || false;
                                  const updatedAmenites = isChecked
                                    ? formik.values.amenites?.filter(
                                        (type) => type !== amenity.id
                                      ) || []
                                    : [...(formik.values.amenites || []), amenity.id];

                                  formik.setFieldValue("amenites", updatedAmenites);
                                }}
                              />
                              <label disabled={isdisable}>{amenity.name}</label>
                            </Grid>
                          ))}
                        </Grid>
                      </div>
                    </Grid>
                    {/* Description */}
                    <Grid item xs={6} sm={6} md={6}>
                      <TextField
                        variant="standard"
                        error={!!(formik.touched.description && formik.errors.description)}
                        fullWidth
                        helperText={formik.touched.description && formik.errors.description}
                        label="Description"
                        name="description"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="Text areas"
                        multiline
                        disabled={isdisable}
                        value={formik.values.description}
                      />
                    </Grid>
                    {/* Agreement Duration */}
                    {formik.values.property_for == 2 && (
                      <Grid item xs={6} sm={6} md={6}>
                        <Box sx={{ minWidth: 120 }}>
                          <FormControl fullWidth variant="standard">
                            <InputLabel
                              error={
                                !!(
                                  formik.touched.agreement_duration &&
                                  formik.errors.agreement_duration
                                )
                              }
                              fullWidth
                              helperText={
                                formik.touched.agreement_duration &&
                                formik.errors.agreement_duration
                              }
                              id="demo-simple-select-label"
                              disabled={isdisable}
                            >
                              Agreement Duration{""}
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={formik.values.agreement_duration}
                              name="agreement_duration"
                              label="Select"
                              onChange={formik.handleChange}
                              disabled={isdisable}
                            >
                              <MenuItem value={1}>3 Months</MenuItem>
                              <MenuItem value={2}>6 Months</MenuItem>
                              <MenuItem value={3}>11 Months</MenuItem>
                              <MenuItem value={4}>2 Years</MenuItem>
                              <MenuItem value={5}>2+ Years</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                      </Grid>
                    )}
                    {/* Who Will Show The House */}
                    <Grid item xs={6} sm={6} md={6}>
                      <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth variant="standard">
                          <InputLabel
                            error={!!(formik.touched.who_will_show && formik.errors.who_will_show)}
                            fullWidth
                            helperText={formik.touched.who_will_show && formik.errors.who_will_show}
                            id="demo-simple-select-label"
                          >
                            Who Will Show The House{""}
                          </InputLabel>
                          <Select
                            disabled={isdisable}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={formik.values.who_will_show}
                            name="who_will_show"
                            label="Select"
                            onChange={formik.handleChange}
                          >
                            <MenuItem value={1}>One</MenuItem>
                            <MenuItem value={2}>Two</MenuItem>
                            <MenuItem value={3}>Three</MenuItem>
                            <MenuItem value={4}>Four</MenuItem>
                            <MenuItem value={5}>Five</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                    {/* Preferred Tenant */}
                    {formik.values.property_for == 2 && (
                      <Grid item xs={6} sm={6} md={6}>
                        <FormControl>
                          <FormLabel
                            error={
                              !!(formik.touched.prefered_tenants && formik.errors.prefered_tenants)
                            }
                            fullWidth
                            helperText={
                              formik.touched.prefered_tenants && formik.errors.prefered_tenants
                            }
                            id="demo-radio-buttons-group-label"
                            disabled={isdisable}
                          >
                            Preferred Tenant
                          </FormLabel>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            value={formik.values.prefered_tenants}
                            onChange={(event) =>
                              formik.setFieldValue("prefered_tenants", event.target.value)
                            }
                            name="radio-buttons-group"
                          >
                            <Grid container style={{ textAlign: "left" }}>
                              <Grid item xs={6} sm={6} md={6}>
                                <FormControlLabel
                                  disabled={isdisable}
                                  value="Family"
                                  control={<Radio />}
                                  label="Family"
                                />
                              </Grid>
                              <Grid item xs={6} sm={6} md={6}>
                                <FormControlLabel
                                  disabled={isdisable}
                                  value="Bachelor's"
                                  control={<Radio />}
                                  label="Bachelor's"
                                />
                              </Grid>
                              <Grid item xs={6} sm={6} md={6}>
                                <FormControlLabel
                                  disabled={isdisable}
                                  value="Company"
                                  control={<Radio />}
                                  label="Company"
                                />
                              </Grid>
                              <Grid item xs={6} sm={6} md={6}>
                                <FormControlLabel
                                  disabled={isdisable}
                                  value="Doesn't Matter"
                                  control={<Radio />}
                                  label="Doesn't Matter"
                                />
                              </Grid>
                            </Grid>
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                    )}

                    {/* Propery Images */}
                    <Grid item xs={12} sm={12} md={12}>
                      <PostForm7
                        disabled={isdisable}
                        uploadedPropertyImageName={uploadedPropertyImageName}
                        setUploadedPropertyImageName={setUploadedPropertyImageName}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      {isEditing ? (
                        <Button onClick={handleDisable} variant="outlined" color="success">
                          Edit
                        </Button>
                      ) : (
                        <>
                          <Grid
                            textAlign="center"
                            container
                            flexDirection="row"
                            justifyContent="space-between"
                          >
                            <Grid item xs={6}>
                              <Button
                                onClick={() => {
                                  formik.handleSubmit();
                                }}
                                variant="contained"
                                color="success"
                              >
                                Submit
                              </Button>
                            </Grid>

                            <Grid item xs={6}>
                              <Button
                                onClick={() => {
                                  setIsEditing(true);
                                  setIsdisable(true);
                                }}
                                variant="contained"
                                color="warning"
                              >
                                Cancel
                              </Button>
                            </Grid>
                          </Grid>
                        </>
                      )}
                    </Grid>

                    {isEditing && (
                      <>
                        <Grid item xs={3}>
                          <Button
                            disabled={propertyDetails.property_statusID == 1}
                            onClick={() => handleStatusChangeButton(1)}
                            variant="contained"
                            color="success"
                          >
                            Active
                          </Button>
                        </Grid>

                        <Grid item xs={3}>
                          <Button
                            disabled={propertyDetails.property_statusID == 2}
                            onClick={() => handleStatusChangeButton(2)}
                            variant="contained"
                            color="warning"
                          >
                            Inactive
                          </Button>
                        </Grid>
                        <Grid item xs={3}>
                          <Button
                            disabled={propertyDetails.property_statusID == 3}
                            onClick={() => handleStatusChangeButton(3)}
                            variant="contained"
                            color="warning"
                          >
                            Mark Pending
                          </Button>
                        </Grid>
                        <Grid item xs={3}>
                          <Button
                            disabled={propertyDetails.property_statusID == 4}
                            onClick={() => setRejectModal(true)}
                            variant="contained"
                            color="error"
                          >
                            Reject
                          </Button>
                        </Grid>
                      </>
                    )}

                    <Grid item xs={12} sm={12} md={12}>
                      <Scrollbar>
                        <Typography variant="h6" component="h2">
                          Admin Action Log:
                        </Typography>
                        <Grid item xs={12} sm={12} md={12}></Grid>
                        <Box>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>Admin Name</TableCell>
                                <TableCell>Activity</TableCell>
                                <TableCell>Date</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                                <TableCell>
                                  <Stack alignItems="center" direction="row" spacing={2}>
                                    <Typography variant="subtitle2">Admin-1</Typography>
                                  </Stack>
                                </TableCell>
                                <TableCell>Active</TableCell>
                                <TableCell>15-12-2023</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>
                                  <Stack alignItems="center" direction="row" spacing={2}>
                                    <Typography variant="subtitle2">Admin-2</Typography>
                                  </Stack>
                                </TableCell>
                                <TableCell>Update</TableCell>
                                <TableCell>13-12-2023</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>
                                  <Stack alignItems="center" direction="row" spacing={2}>
                                    <Typography variant="subtitle2">Admin-1</Typography>
                                  </Stack>
                                </TableCell>
                                <TableCell>Reject</TableCell>
                                <TableCell>11-12-2023</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </Box>
                      </Scrollbar>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Grid>
          </Paper>
        </CardContent>
      </Card>
    </>
  );
}

export default PropertyDetailsForm;
