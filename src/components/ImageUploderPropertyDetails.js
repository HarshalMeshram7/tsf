import React, { useReducer, useState } from "react";
import { saveImageApi } from "../service/propertyRequests";
import uploadFileToBlob, { deleteBlob, handlePriview } from "../utils/azureBlob";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import InputFileUpload from "./uploadButton";
import { Button, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
export default function PostForm7({
  uploadedPropertyImageName,
  setUploadedPropertyImageName,
  disabled,
}) {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {},

    validationSchema: Yup.object({}),

    onSubmit: async (data) => {
      try {
        console.log({ ...data, propertyImages: uploadedPropertyImageName });
      } catch (error) {
        console.log(error);
      }
    },
  });

  //   upload image
  const [loading, setLoading] = useState();

  const [uploadedPropertyImage, setUploadedPropertyImage] = useState(false);

  const [selectedPropertyImages, setSelectedPropertyImages] = useState([]);
  const [selectedPropertyImageNames, setSelectedPropertyImageNames] = useState([]);

  const onFileChange = (e) => {
    // if (e.target.name == "DocumentPropertyImageOrgClub") {
    setUploadedPropertyImage(false);
    setSelectedPropertyImages(e.target.files);

    let files = e.target.files;

    const updatedFiles = Array.from(files).map((file) => {
      const uniqueFileName = `${uuidv4()}_${file.name}`;
      setSelectedPropertyImageNames((oldArray) => [...oldArray, uniqueFileName]);
      return new File([file], uniqueFileName, { type: file.type });
    });

    setSelectedPropertyImages(updatedFiles);
    // }
  };

  const onFileUpload = async () => {
    setLoading(true);

    for (let index = 0; index < selectedPropertyImages.length; index++) {
      uploadFileToBlob(selectedPropertyImages[index]).then(() => {
        setUploadedPropertyImageName((oldArray) => [
          ...oldArray,
          {
            img_name: selectedPropertyImages[index].name,
            src: handlePriview(selectedPropertyImages[index].name),
          },
        ]);
      });
    }

    // Wait for all uploads to complete
    setSelectedPropertyImageNames([]);
    setSelectedPropertyImages([]);
    setUploadedPropertyImage(true);
    setLoading(false);
  };

  const onDeleteFile = (fileName) => {
    deleteBlob(fileName).then(() => {
      setUploadedPropertyImageName((prevState) => {
        const index = prevState.findIndex((item) => item.img_name == fileName);
        if (index > -1) {
          prevState.splice(index, 1);
        }
        if (prevState?.length < 1) {
          setUploadedPropertyImage(false);
          setSelectedPropertyImages([]);
        }
        return prevState;
      });
    });
    forceUpdate();
  };
  const { v4: uuidv4 } = require("uuid");
  uuidv4();
  return (
    <>
      {/* {console.log(uuidv4())} */}
      <body>
        <section class="Step-7" id="Step-7">
          <div class="right">
            <h1 class="Title">Property Images</h1>
            {uploadedPropertyImageName?.length > 0 && (
              <div id="result" style={{ display: "flex", flexDirection: "row", gap: "2%" }}>
                {uploadedPropertyImageName.map((propertyImage, index) => (
                  <div className="box thumbnail-JqfG3XK" style={{position:"relative"}} key={index}>
                    {!disabled && (
                      <>
                        {/* <img
                          style={{ display: "block" }}
                          src="http://3.109.90.125/front-assets/Images/Close-Image.png"
                          data-key="JqfG3XK"
                          className="remove-image"
                          id="Close"
                          onClick={() => onDeleteFile(propertyImage.img_name)}
                        /> */}
                        <IconButton style={{background:"red",padding:'0px', color:'white', position:'absolute',top:'-10%',right:'-10%'}} onClick={() => onDeleteFile(propertyImage.img_name)} aria-label="delete" size="2px">
                          <ClearIcon fontSize="small" />
                        </IconButton>
                      </>
                    )}
                    <img
                      src={`${handlePriview(propertyImage.img_name)}`}
                      width={100}
                      height={100}
                      alt={propertyImage.img_name}
                    />
                  </div>
                ))}
              </div>
            )}

            <div>
              {/* <input
                style={{ display: "none" }}
                id="uploadDocumentPropertyImageOrgClub"
                margin="dense"
                name="DocumentPropertyImageOrgClub"
                onChange={onFileChange}
                type="file"
                value={formik.values.DocumentPropertyImageOrgClub}
                variant="outlined"
                multiple
              /> */}
              {/* <button
                disabled={disabled}
                onClick={() => {
                  document.getElementById("uploadDocumentPropertyImageOrgClub").click();
                }}
                >
                Upload Logo
              </button> */}
              <InputFileUpload disabled={disabled} onFileChange={onFileChange}></InputFileUpload>
              {selectedPropertyImageNames.length > 0 && <p>Selected Files</p>}
              {selectedPropertyImageNames?.map((fileName, index) => {
                let filename = fileName?.split("_");
                return <p key={index}>{filename[1]}</p>;
              })}

                {(selectedPropertyImages.length > 0) && <Button
                  variant="contained"
                  disabled={!selectedPropertyImages.length > 0}
                  onClick={() => {
                    onFileUpload();
                  }}
                >
                  Upload
                </Button>}
              </div>
          </div>
        </section>
      </body>
    </>
  );
}
