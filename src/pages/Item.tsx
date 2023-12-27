import {
  Avatar,
  Breadcrumbs,
  Dialog,
  DialogContent,
  Divider,
  ImageList,
  Typography,
} from "@mui/material";
import Link from "@mui/material/Link";
import { useState } from "react";
import {
  Button,
  Datagrid,
  DateField,
  ExportButton,
  FilterButton,
  FunctionField,
  List,
  ListButton,
  RichTextField,
  Show,
  TabbedShowLayout,
  TextField,
  TextInput,
  TopToolbar,
  useRecordContext,
} from "react-admin";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link as LinkDOM } from "react-router-dom";

const ItemListActions = () => (
  <TopToolbar>
    <FilterButton />
    <ExportButton />
  </TopToolbar>
);

const itemListFilters = [
  <TextInput key="item-filter" label="Global Search" source="globalSearch" />,
];

export const Product = () => {
  return (
    <List
      disableSyncWithLocation
      actions={<ItemListActions />}
      filters={itemListFilters}
      sort={{ field: "createdAt", order: "DESC" }}
    >
      <Datagrid bulkActionButtons={false} rowClick="show">
        <FunctionField
          render={(rec) => {
            return "#" + rec.id;
          }}
          label="Id"
          sortBy="id"
          sortable={true}
        />
        <TextField source="itemName" label="Name" />
        <DateField source="createdAt" label="Listed On" sortable={false} />
        <FunctionField
          render={(rec) => "$" + rec.askingPrice}
          label="Listing Price"
        />
      </Datagrid>
    </List>
  );
};

const ShowProductActions = () => (
  <TopToolbar>
    <ListButton />
  </TopToolbar>
);

export const ShowProduct = () => {
  const [userId, setUserId] = useState(null);
  return (
    <Show actions={<ShowProductActions />}>
      <Breadcrumbs>
        <Link href="/#/user">Home</Link>
        <Link href="/#/product">Products</Link>
      </Breadcrumbs>
      <TabbedShowLayout divider={<Divider flexItem />}>
        <TabbedShowLayout.Tab label="summary">
          <FunctionField
            render={(rec) => {
              return "#" + rec.id;
            }}
            label="Listing"
          />
          <TextField source="itemName" label="Name" />
          <TextField source="location" label="Address" sortable={false} />
          <TextField source="askingPrice" label="Listing Price" />
          <DateField source="createdAt" label="Listed On" sortable={false} />
          <FunctionField
            render={(rec) => {
              return rec.isSold ? "Yes" : "No";
            }}
            label="Sold"
          />
          <RichTextField
            source="itemDescription"
            label="Description"
            sortable={false}
            style={{
              wordWrap: "anywhere",
              width: "fit-content",
              textWrap: "pretty",
            }}
          />
          <FunctionField
            render={(rec) => {
              return rec.user.firstName + " " + rec.user.lastName;
            }}
            label="Owner"
          />
        </TabbedShowLayout.Tab>
        <TabbedShowLayout.Tab label="Details">
          <Typography variant="h4">General Information</Typography>
          <TextField source="make" />
          <TextField source="model" />
          <TextField source="makeYear" />
          <FunctionField
            render={(rec) => {
              return "$" + rec.askingPrice;
            }}
            label="Price"
          />
          <FunctionField
            render={(rec) => (rec.GCM ? rec.GCM : "-")}
            label="GCM"
          />
          <FunctionField
            render={(rec) => (rec.GVM ? rec.GVM : "-")}
            label="GVM"
          />
          <FunctionField
            render={(rec) => (rec.VIN ? rec.VIN : "-")}
            label="VIN"
          />
          <FunctionField
            render={(rec) => {
              return rec.odometer ? rec.odometer + " KM" : "-";
            }}
            label="Odometer"
          />
          <FunctionField
            render={(rec) => {
              return rec.GVM ? rec.GVM : "-";
            }}
            label="GVM"
          />
          <FunctionField
            render={(rec) => {
              return rec.GCM ? rec.GCM : "-";
            }}
            label="GCM"
          />
          <FunctionField
            render={(rec) => {
              return rec.registered
                ? rec.registered == "null" || rec.registered == false
                  ? "No"
                  : "Yes"
                : "-";
            }}
            label="Registerd"
          />
          <FunctionField
            render={(rec) => {
              return rec.registrationExpires ? rec.registrationExpires : "-";
            }}
            label="Registration Expires"
          />
          <FunctionField
            render={(rec) => {
              return rec.registrationExpires ? rec.registrationExpires : "-";
            }}
            label="Registration Number"
          />
          <FunctionField
            render={(rec) => {
              return rec.delivery ? rec.delivery : "-";
            }}
            label="Delivery Type"
          />
          <Typography variant="h4">Engine Details</Typography>
          <FunctionField
            render={(rec) => {
              return rec.horsePower ? rec.horsePower + " HP" : "-";
            }}
            label="Horse Power"
          />
          <FunctionField
            render={(rec) => (rec.enginePower ? rec.enginePower : "-")}
            label="Engine Power"
          />
          <FunctionField
            render={(rec) => (rec.fuelType ? rec.fuelType : "-")}
            label="Fuel Type"
          />
          <FunctionField
            render={(rec) => (rec.transmission ? rec.transmission : "-")}
            label="Transmission"
          />
          <FunctionField
            render={(rec) => (rec.cylinders ? rec.cylinders : "-")}
            label="Cylinders"
          />
          <FunctionField
            render={(rec) => (rec.drive ? rec.drive : "-")}
            label="Drive"
          />
          <FunctionField
            render={(rec) => (rec.suspension ? rec.suspension : "-")}
            label="Suspension"
          />
          <FunctionField
            render={(rec) => (rec.engineSize ? rec.engineSize : "-")}
            label="Engine Size"
          />
        </TabbedShowLayout.Tab>
        <TabbedShowLayout.Tab label="images">
          <ImageViewer />
        </TabbedShowLayout.Tab>
        <TabbedShowLayout.Tab label="Owner">
          <UserAvatar label="Profile" />
          <TextField source="user.firstName" label="First Name" />
          <TextField source="user.lastName" label="Last Name" />
          <FunctionField
            render={(rec) => {
              setUserId(rec.user.id);
              return rec.company ? rec.company : "-";
            }}
            label="Company"
          />
          <Button>
            <LinkDOM
              style={{ textDecoration: "none" }}
              to={`/user/${userId}/show`}
            >
              Go to profile
            </LinkDOM>
          </Button>
        </TabbedShowLayout.Tab>
      </TabbedShowLayout>
    </Show>
  );
};

const UserAvatar = () => {
  const record = useRecordContext();
  const url = record.user.profilePhoto ? record.user.profilePhoto : undefined;
  return (
    <Avatar
      src={url}
      sx={{ width: 50, height: 50 }}
      alt={`${record.user.firstName}`}
    />
  );
};

const ImageViewer = () => {
  const record = useRecordContext();
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleImageClick = (img: string) => {
    setSelectedImage(img);
    console.log(selectedImage);

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ImageList cols={4} gap={8} sx={{ overflow: "hidden" }}>
        {record.images.map((img) => (
          <>
            <img
              style={{
                height: "auto",
                width: "100%",
                margin: "2px",
                border: "2px solid black",
                cursor: "pointer",
              }}
              src={img.image_url}
              alt="image"
              key={img.id}
              onClick={() => handleImageClick(img.image_url)}
            />
          </>
        ))}
      </ImageList>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent sx={{ padding: "0px" }}>
          <img
            src={selectedImage}
            alt="zoomed-in image"
            style={{ width: "100%" }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
