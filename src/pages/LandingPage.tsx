import { Grid, InputLabel, Paper, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import {
  ArrayInput,
  Button,
  Create,
  ImageField,
  ImageInput,
  SimpleForm,
  SimpleFormIterator,
  TextInput,
  required,
  useInput,
} from "react-admin";
// import { fileUpload } from "./common/fileUpload";
import axios from "axios";
import { ChromePicker } from "react-color";
import { customAuthProvider } from "../App";

const ColorInput = (props) => {
  const [showPicker, setShowPicker] = useState(false);
  const { colorKey, onChange, onBlur, ...rest } = props;
  // const notify = useNotify();

  const { field } = useInput({
    onChange,
    onBlur,
    ...rest,
  });

  const toggleColorPicker = () => {
    setShowPicker((value) => !value);
  };

  const colorName = colorKey?.charAt(0)?.toUpperCase() + colorKey?.slice(1);

  return (
    <>
      <InputLabel htmlFor={colorKey}>{colorName} Color</InputLabel>
      <Button
        variant="contained"
        style={{
          backgroundColor: field.value,
          width: "100%",
          height: "50px",
        }}
        onClick={() => toggleColorPicker(colorKey)}
      >
        Choose {colorName} Color
      </Button>
      {showPicker && (
        <ChromePicker
          color={field.value}
          onChange={(newColor) => field.onChange(newColor.hex)}
        />
      )}
    </>
  );
};

export const fileUpload = async (file) => {
  const token = await customAuthProvider.getJWTToken();
  const reponse = await axios.post(
    // `https://letit-api.bosctechlab.com/rest/image-upload/admin/images/${file.name}`,
    // `http://3.105.151.177:8083/rest/image-upload/admin/adminPanel/${file.name}`,
    `https://backend.trucknearthsales.com.au/rest/image-upload/profile/${file.name}`,
    null,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const fileUploadData = reponse?.data?.data;

  await axios.put(fileUploadData.apiUrl, file, {
    "Content-Type": file?.type,
  });
  return fileUploadData.location;
};

const validateRequired = [required()];

// Custom validation function for Play Store URL
const validatePlayStoreUrl = (value) => {
  const playStorePattern =
    /^https:\/\/play\.google\.com\/store\/apps\/details\?id=.+$/;
  if (!playStorePattern.test(value)) {
    return "Please enter a valid Play Store URL.";
  }
  return undefined; // No validation error
};

// Custom validation function for App Store URL
const validateAppStoreUrl = (value) => {
  const appStorePattern = /^https:\/\/apps\.apple\.com\/app\/.+\/id\d+$/;
  if (false ?? !appStorePattern.test(value)) {
    return "Please enter a valid App Store URL.";
  }
  return undefined; // No validation error
};

const LandingPage = (props: any) => {
  const [tab, setTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };
  const handleFormSubmit = async (data) => {
    try {
      //For logo image upload
      if (data.logo?.rawFile) {
        const fileUploadResponse = await fileUpload(data.logo.rawFile);
        data.logo = fileUploadResponse;
      }

      //For dashboard image upload
      if (data.dashboardImg?.rawFile) {
        const fileUploadResponse = await fileUpload(data.dashboardImg.rawFile);
        data.dashboardImg = fileUploadResponse;
      }

      //For Features image upload
      for (const feature of data.features) {
        if (feature.image.rawFile) {
          // Adjust the URL as per your API endpoint
          const fileUploadResponse = await fileUpload(feature.image.rawFile);
          feature.image = fileUploadResponse;
        }
      }

      //For Testimonial image upload
      for (const testimonial of data.testomonial) {
        if (testimonial?.image?.rawFile) {
          // Adjust the URL as per your API endpoint
          const fileUploadResponse = await fileUpload(
            testimonial.image.rawFile
          );
          testimonial.image = fileUploadResponse;
        }
      }
      const postData = {
        ...data,
      };

      // Create an array with a single object and send it as JSON
      const dataArray = [postData];

      const response = await axios.post(
        "https://trucknearthsales.com.au/api/saveData",
        dataArray
      );

      if (response.status == 200) {
        // Request was successful
        const responseData = await response.data;
        alert("Data Uploaded successfully");
        // notify(`Data Uploaded successfully`, { type: "success" });
      } else {
        // Handle the error if the request was not successful
        alert("Failed to upload");
        console.error("API Request Failed");
      }
    } catch (error) {
      console.error("Error in handleFormSubmit:", error);
    }
  };

  return (
    <div>
      <Create {...props}>
        <SimpleForm defaultValues={props} onSubmit={handleFormSubmit}>
          <Paper elevation={3} style={{ padding: "16px", width: "100%" }}>
            <Tabs value={tab} onChange={handleTabChange} centered>
              <Tab label="Logos" />
              <Tab label="Heading and Subheading" />
              <Tab label="Features" />
              <Tab label="Testimonials" />
              <Tab label="FAQs" />
              <Tab label="Color Picker" />
              <Tab label="Footer" />
            </Tabs>
          </Paper>

          {tab === 0 && (
            <Paper
              elevation={3}
              style={{ padding: "16px", marginTop: "16px", width: "100%" }}
            >
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <ImageInput
                    source="logo"
                    label="Logo"
                    accept="image/*"
                    fullWidth
                    // validate={required()}
                  >
                    <ImageField source="src" title="title" />
                  </ImageInput>
                </Grid>
                <Grid item xs={6}>
                  <TextInput
                    source="logoText"
                    label="Logo Text"
                    fullWidth
                    validate={required()}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextInput
                    source="playstoreLink"
                    label="PlayStore Link"
                    fullWidth
                    validate={[required(), validatePlayStoreUrl]}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextInput
                    source="appstoreLink"
                    label="AppStore Link"
                    fullWidth
                    validate={[required(), validateAppStoreUrl]}
                  />
                </Grid>
              </Grid>
            </Paper>
          )}

          {tab === 1 && (
            <Paper
              elevation={3}
              style={{ padding: "16px", marginTop: "16px", width: "100%" }}
            >
              <TextInput
                source="heading"
                label="Heading"
                fullWidth
                validate={required()}
              />
              <TextInput
                source="subHeading"
                label="Subheading"
                fullWidth
                validate={required()}
              />
              <ImageInput
                source="dashboardImg"
                label="Dashboard Image"
                accept="image/*"
                fullWidth
                // validate={validateRequired}
              >
                <ImageField source="src" title="title" />
              </ImageInput>
            </Paper>
          )}

          {tab === 2 && (
            <Paper
              elevation={3}
              style={{ padding: "16px", marginTop: "16px", width: "100%" }}
            >
              <ArrayInput
                source="features"
                label="Features"
                validate={validateRequired}
              >
                <SimpleFormIterator fullWidth>
                  <h1>Feature</h1>
                  <ImageInput
                    source="image"
                    label="Feature Image"
                    accept="image/*"
                    fullWidth
                    // validate={validateRequired}
                  >
                    <ImageField source="src" title="title" />
                  </ImageInput>
                  <TextInput
                    source="heading"
                    label="Feature Title"
                    fullWidth
                    validate={validateRequired}
                  />
                  <TextInput
                    multiline
                    source="desc"
                    label="Feature Description"
                    fullWidth
                    validate={validateRequired}
                  />
                </SimpleFormIterator>
              </ArrayInput>
            </Paper>
          )}

          {tab === 3 && (
            <Paper
              elevation={3}
              style={{ padding: "16px", marginTop: "16px", width: "100%" }}
            >
              <ArrayInput
                source="testomonial"
                label="Testimonials"
                validate={validateRequired}
              >
                <SimpleFormIterator fullWidth>
                  <h1>Testimonials</h1>
                  <ImageInput
                    source="image"
                    label="Testimonials Image"
                    accept="image/*"
                    fullWidth
                    // validate={validateRequired}
                  >
                    <ImageField source="src" title="title" />
                  </ImageInput>
                  <TextInput
                    source="name"
                    label="Testimonial Name"
                    fullWidth
                    validate={validateRequired}
                  />
                  <TextInput
                    multiline
                    source="desc"
                    label="Testimonials Description"
                    fullWidth
                    validate={validateRequired}
                  />
                </SimpleFormIterator>
              </ArrayInput>
            </Paper>
          )}

          {tab === 4 && (
            <Paper
              elevation={3}
              style={{ padding: "16px", marginTop: "16px", width: "100%" }}
            >
              <ArrayInput
                source="faqs"
                label="FAQs"
                fullWidth
                validate={validateRequired}
              >
                <SimpleFormIterator fullWidth>
                  <h1>FAQs</h1>
                  <TextInput
                    multiline
                    source="que"
                    label="Question"
                    fullWidth
                    validate={validateRequired}
                  />
                  <TextInput
                    multiline
                    source="ans"
                    label="Answer"
                    fullWidth
                    validate={validateRequired}
                  />
                </SimpleFormIterator>
              </ArrayInput>
            </Paper>
          )}

          {tab === 5 && (
            <Paper elevation={3} style={{ padding: "16px", width: "100%" }}>
              <Grid container spacing={3}>
                {[
                  "backgroundColor",
                  "primary",
                  "primaryDark",
                  "secondary",
                  "secondaryDark",
                  "secondaryLight",
                  "textColor",
                  "textColor2",
                  "firstColor",
                  "firstColorDark",
                  "secondColor",
                ].map((colorKey) => (
                  <Grid item xs={4} key={colorKey}>
                    <ColorInput
                      colorKey={colorKey}
                      source={`colors.${colorKey}`}
                      label="Answer"
                    />
                  </Grid>
                ))}
              </Grid>
            </Paper>
          )}

          {tab === 6 && (
            <Paper
              elevation={3}
              style={{ padding: "16px", marginTop: "16px", width: "100%" }}
            >
              <TextInput
                source="companyName"
                label="Company Name"
                fullWidth
                // validate={required()}
              />
              <TextInput
                source="termsOfUse"
                label="Terms Of Use"
                fullWidth
                // validate={required()}
              />
              <TextInput
                source="privacyPolice"
                label="Privacy Policy"
                fullWidth
                // validate={required()}
              />
              <TextInput
                source="email"
                label="Email"
                fullWidth
                // validate={required()}
              />
              <TextInput
                source="fbLink"
                label="FaceBook Link"
                fullWidth
                // validate={required()}
              />
              <TextInput
                source="igLink"
                label="Instagram Link"
                fullWidth
                // validate={required()}
              />
              <TextInput
                source="twitterLink"
                label="Twitter Link"
                fullWidth
                // validate={required()}
              />

              <TextInput
                source="tiktokLink"
                label="TikTok Link"
                fullWidth
                // validate={required()}
              />
            </Paper>
          )}
        </SimpleForm>
      </Create>
    </div>
  );
};

export default LandingPage;
