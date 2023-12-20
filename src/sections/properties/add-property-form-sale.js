import {
  Alert,
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
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box } from "@mui/system";
import { getAppartmentsList, getCityList } from "src/service/locationRequests";
import { getLocalitiesList } from "src/service/locality";
import { getBuildingType } from "src/service/property_type";
import { saveUser, getAmenites } from "src/service/userRequests";
import { saveImageApi, saveProperty } from "src/service/propertyRequests";
import { useSnackbar } from "notistack";
import ImageUploder from '../../components/ImageUploder'
import { handlePriview } from "src/utils/azureBlob";

function AddPropertyDialogForSale() {
  const [cities, setCities] = useState([]);
  const [localities, setLocalities] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [amenitesList, setAmenitesList] = useState([]);
  const [appartments, setAppartments] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [showFloorList, setShowFloorList] = useState();
  const [floorChange, setFloorChange] = useState();
  const [number, setNumber] = useState();
  const [options, setOptions] = useState([]);
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

  const formik = useFormik({
    initialValues: {
      user_id: "",
      name: "admin",
      email: "admin@truesqurefeet.com",
      mobile_no: "",
      city_id: "",
      building_types_id: "",
      locality_id: "",
      apartment_id: "",
      bhk_type: "",
      carpet_area: "",
      builtup_area: "",
      super_builtup: "",
      plot_area: "",
      floor_total: "",
      floor_no: "",
      readytomove_underconstruction: "",
      property_age: "",
      possestion_date: "",
      price: "",
      token_amount: "",
      maintainance_cost: "",
      price_negotiable: "",
      under_loan: "",
      number_bathroom: "",
      number_balconies: "",
      furnish_type: "",
      coverd_parking: "",
      open_parking: "",
      kitchen_type: "",
      water_supply: "",
      flooring_type: "",
      property_facing: "",

      amenites: "", //not av
      description: "",
      who_will_show: "",
      // selectYear: "",
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

    onSubmit: async (values, { resetForm }) => {
      try {
        console.log(values);

        saveUser({
          name: values.name,
          email: values.email,
          mobile_no: values.mobile_no,
          User_TypeID: 2,
        }).then((userRes) => {
          saveProperty({
            ...values,
            user_id: userRes.id,
            property_statusID: 1,
            property_types_id: 1,
          }).then((propertyRes) => {
            // alert(res.id)
            uploadedPropertyImageName.map((name,key)=>{
              saveImageApi({
                "property_id": propertyRes.id,
                "img_name": name,
                "src": handlePriview(name),
                "thumbnail": handlePriview(name),
                "img_index": key,
                }).then((imageRes)=>{
                  console.log("image added",imageRes);
              })
            })
            enqueueSnackbar("Property added", { variant: "success" });
            setUploadedPropertyImageName([])
            resetForm();
          });
        });
      } catch (err) {
        enqueueSnackbar("Property not added", { variant: "error" });
      }
    },
  });

  //for city list
  useEffect(() => {
    getCityList().then((res) => {
      setCities(res);
    });
    //amenites
    getAmenites().then((res) => {
      setAmenitesList(res);
    });

    //property type
    getBuildingType().then((res) => {
      setPropertyTypes(res);
      console.log(propertyTypes);
    });
  }, []);

  // for localities list
  const handleCityChaange = (e) => {
    getLocalitiesList({ city_id: e.target.value }).then((res) => {
      setLocalities(res);
    });
    getAppartmentsList({ city_id: e.target.value }).then((res) => {
      setAppartments(res);
      console.log(res);
    });
  };
  // ***********************

  return (
    <>
      <Card sx={{ minWidth: 300 }} style={{ textAlign: "center" }}>
        <CardContent>
          <Paper elevation={0}>
            <Grid container style={{ textAlign: "center" }}>
              <Grid item xs={12} sm={12} md={12}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Grid
                    Grid
                    sx={{ maxWidth: "90%" }}
                    container
                    style={{ textAlign: "left", margin: "0px" }}
                    spacing={4}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                    justifyContent="center"
                  >
                    <Grid item xs={12} sm={12} md={12}>
                      <Typography variant="h3" component="h2">
                        Property For Sale
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12}></Grid>
                    {/* Email */}
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
                    {/* UserName */}
                    <Grid item xs={6} sm={6} md={6}>
                      <TextField
                        variant="standard"
                        error={!!(formik.touched.name && formik.errors.name)}
                        fullWidth
                        helperText={formik.touched.name && formik.errors.name}
                        label="UserName"
                        name="name"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.name}
                      />
                    </Grid>
                    {/* Mobile No. */}
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
                    {/* Property Type */}
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
                              label={propertyTypes.name}
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </Grid>
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
                    {/* Bhk Type */}
                    <Grid item xs={6} sm={6} md={6}>
                      <FormControl>
                        <FormLabel
                          variant="standard"
                          error={!!(formik.touched.bhk_type && formik.errors.bhk_type)}
                          fullWidth
                          helperText={formik.touched.bhk_type && formik.errors.bhk_type}
                          id="demo-radio-buttons-group-label"
                        >
                          BHK Type
                        </FormLabel>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          name="bhk_type"
                          value={formik.values.bhk_type} // Set the value to the formik field
                          onChange={(event) => formik.setFieldValue("bhk_type", event.target.value)}
                        >
                          <Grid container>
                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel value="1BHK" control={<Radio />} label="BHK1" />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel value="2BHK" control={<Radio />} label="BHK2" />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel value="3BHK" control={<Radio />} label="BHK3" />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel value="4BHK" control={<Radio />} label="BHK4" />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel value="RK" control={<Radio />} label="RK" />
                            </Grid>
                          </Grid>
                        </RadioGroup>
                      </FormControl>
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
                        value={formik.values.builtup_area}
                      />
                    </Grid>
                    {/* Super Built-Up Area */}
                    <Grid item xs={6} sm={6} md={6}>
                      <TextField
                        variant="standard"
                        error={!!(formik.touched.super_builtup && formik.errors.super_builtup)}
                        fullWidth
                        helperText={formik.touched.super_builtup && formik.errors.super_builtup}
                        label="Super Built-Up Area"
                        name="super_builtup"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="Text"
                        value={formik.values.super_builtup}
                      />
                    </Grid>
                    {/* Ploat Area ON property types Independent vila / house  */}
                    {formik.values.building_types_id == 2 && (
                      <Grid item xs={6} sm={6} md={6}>
                        <TextField
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
                    )}
                    {/* Total Floors */}
                    <Grid item xs={6} sm={6} md={6}>
                      <TextField
                        variant="standard"
                        type="number"
                        error={!!(formik.touched.floor_total && formik.errors.floor_total)}
                        fullWidth
                        helperText={formik.touched.floor_total && formik.errors.floor_total}
                        label="Total Floors"
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
                              disabled={!formik.values.floor_total}
                            >
                              <MenuItem value="">Select</MenuItem>
                              <MenuItem value="1">Under-Ground</MenuItem>
                              <MenuItem value="2">Lower-Ground</MenuItem>
                              <MenuItem value="3">Ground</MenuItem>

                              {options.map((option) => (
                                <MenuItem key={option} value={3 + option}>
                                  Floor No {option}
                                </MenuItem>
                              ))}
                            </Select>
                            {/* Display validation error */}
                            <span className="formik-validation">
                              {formik.touched.floor_no && formik.errors.floor_no}
                            </span>
                          </FormControl>
                        </Box>
                      </Grid>
                    )}

                    {/* Ready To Move / Under Construction */}
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
                          <FormControlLabel value={1} control={<Radio />} label="Ready To Move" />
                          <FormControlLabel
                            value={2}
                            control={<Radio />}
                            label="Under Construction"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    {/* Property Age if Ready to move */}
                    {formik.values.readytomove_underconstruction == 1 && (
                      <Grid item xs={6} sm={6} md={6}>
                        <FormControl fullWidth variant="standard">
                          <InputLabel
                            error={!!(formik.touched.property_age && formik.errors.property_age)}
                            fullWidth
                            helperText={formik.touched.property_age && formik.errors.property_age}
                            id="demo-simple-select-label"
                          >
                            Select Property Age
                          </InputLabel>
                          <Select
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
                              !!(formik.touched.possestion_date && formik.errors.possestion_date)
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
                    {/* Property Price */}
                    <Grid item xs={6} sm={6} md={6}>
                      <TextField
                        variant="standard"
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
                    {/* Token Amount */}
                    <Grid item xs={6} sm={6} md={6}>
                      <TextField
                        variant="standard"
                        error={!!(formik.touched.token_amount && formik.errors.token_amount)}
                        fullWidth
                        helperText={formik.touched.token_amount && formik.errors.token_amount}
                        label="Token Amount"
                        name="token_amount"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="Text"
                        value={formik.values.token_amount}
                      />
                    </Grid>
                    {/* Maintainance Cost */}
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
                        value={formik.values.maintainance_cost}
                      />
                    </Grid>
                    {/* Price Negotiable / Currently UnderLoan  */}
                    <Grid item xs={6} sm={6} md={6}>
                      <div>
                        <Checkbox
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
                        <Checkbox
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
                              <FormControlLabel value="1" control={<Radio />} label="1" />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel value="2" control={<Radio />} label="2" />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel value="3" control={<Radio />} label="3" />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel value="4" control={<Radio />} label="4" />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel value="5+" control={<Radio />} label="5+" />
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
                              <FormControlLabel value="1" control={<Radio />} label="1" />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel value="2" control={<Radio />} label="2" />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel value="3" control={<Radio />} label="3" />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel value="4" control={<Radio />} label="4" />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel value="5+" control={<Radio />} label="5+" />
                            </Grid>
                          </Grid>
                        </RadioGroup>
                      </FormControl>
                    </Grid>
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
                                value="furnished"
                                control={<Radio />}
                                label="Furnished"
                              />
                            </Grid>

                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel
                                value="semifurnished"
                                control={<Radio />}
                                label="Semi Furnished"
                              />
                            </Grid>

                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel
                                value="unfurnished"
                                control={<Radio />}
                                label="Unfurnished"
                              />
                            </Grid>
                          </Grid>
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    {/* Cover Parking */}
                    <Grid item xs={6} sm={6} md={6}>
                      <FormControl>
                        <FormLabel
                          error={!!(formik.touched.coverd_parking && formik.errors.coverd_parking)}
                          fullWidth
                          helperText={formik.touched.coverd_parking && formik.errors.coverd_parking}
                          id="demo-radio-buttons-group-label"
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
                              <FormControlLabel value={1} control={<Radio />} label="1" />
                            </Grid>

                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel value={2} control={<Radio />} label="2" />
                            </Grid>

                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel value={3} control={<Radio />} label="3" />
                            </Grid>

                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel value={4} control={<Radio />} label="4" />
                            </Grid>

                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel value={5} control={<Radio />} label="5" />
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
                              <FormControlLabel value={1} control={<Radio />} label="1" />
                            </Grid>

                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel value={2} control={<Radio />} label="2" />
                            </Grid>

                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel value={3} control={<Radio />} label="3" />
                            </Grid>

                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel value={4} control={<Radio />} label="4" />
                            </Grid>

                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel value={5} control={<Radio />} label="5" />
                            </Grid>
                          </Grid>
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    {/* Kitchen Type */}
                    <Grid item xs={6} sm={6} md={6}>
                      <FormControl>
                        <FormLabel
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
                                value="Modular"
                                control={<Radio />}
                                label="Modular"
                              />
                            </Grid>

                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel
                                value="Covered Shelves"
                                control={<Radio />}
                                label="Covered Shelves"
                              />
                            </Grid>

                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel
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
                              <FormControlLabel value={1} control={<Radio />} label="Corporation" />
                            </Grid>

                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel value={2} control={<Radio />} label="Boring" />
                            </Grid>

                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel value={3} control={<Radio />} label="Both" />
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
                              <FormControlLabel value="Marbel" control={<Radio />} label="Marbel" />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel
                                value="Concrete"
                                control={<Radio />}
                                label="Concrete"
                              />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel value="Stone" control={<Radio />} label="Stone" />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel value="Wood" control={<Radio />} label="Wood" />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel
                                value="Granite"
                                control={<Radio />}
                                label="Granite"
                              />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel value="Cement" control={<Radio />} label="Cement" />
                            </Grid>
                          </Grid>
                        </RadioGroup>
                      </FormControl>
                    </Grid>
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
                              <FormControlLabel value="East" control={<Radio />} label="East" />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel value="West" control={<Radio />} label="West" />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel value="North" control={<Radio />} label="North" />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel value="South" control={<Radio />} label="South" />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel
                                value="North East"
                                control={<Radio />}
                                label="North East"
                              />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                              <FormControlLabel
                                value="South East"
                                control={<Radio />}
                                label="South East"
                              />
                            </Grid>
                          </Grid>
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    {/* Other Aminities */}
                    <Grid item xs={12} sm={12} md={12}>
                      <FormLabel
                        error={!!(formik.touched.amenites && formik.errors.amenites)}
                        fullWidth
                        helperText={formik.touched.amenites && formik.errors.amenites}
                        id="demo-radio-buttons-group-label"
                      >
                        Other Aminities
                      </FormLabel>
                      <div>
                        <Grid container style={{ textAlign: "left" }}>
                          {amenitesList?.map((amenity, index) => (
                            <Grid item xs={3} sm={3} md={3} key={amenity.id}>
                              <Checkbox
                                checked={formik.values.amenites.includes(amenity.id)}
                                value={amenity.id}
                                onChange={() =>
                                  formik.setFieldValue(
                                    "amenites",
                                    formik.values.amenites.includes(amenity.id)
                                      ? formik.values.amenites.filter((type) => type !== amenity.id)
                                      : [...formik.values.amenites, amenity.id]
                                  )
                                }
                              />
                              <label>{amenity.name}</label>
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
                        type="text"
                        value={formik.values.description}
                      />
                    </Grid>
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
                            Who Will Show The House{" "}
                          </InputLabel>
                          <Select
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
                    {/*  */}
                    <Grid item xs={12} sm={12} md={12}>
                    <ImageUploder disabled={false} uploadedPropertyImageName={uploadedPropertyImageName} setUploadedPropertyImageName={setUploadedPropertyImageName}/>      
                    </Grid>
                    {/*  */}
          

                    <Grid item xs={12} sm={12} md={12} style={{ textAlign: "center" }}>
                      <Button variant="contained" onClick={formik.handleSubmit}>
                        Submit
                      </Button>
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

export default AddPropertyDialogForSale;
