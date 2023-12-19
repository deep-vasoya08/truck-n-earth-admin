import {
  Avatar,
  Dialog,
  DialogContent,
  Divider,
  ImageList,
  Typography,
} from "@mui/material";
import { useState } from "react";
import {
  Button,
  Datagrid,
  FilterButton,
  FunctionField,
  List,
  ListButton,
  RichTextField,
  SelectColumnsButton,
  Show,
  ShowButton,
  TabbedShowLayout,
  TextField,
  TextInput,
  TopToolbar,
  useRecordContext,
} from "react-admin";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";

const ItemListActions = () => (
  <TopToolbar>
    <SelectColumnsButton />
    <FilterButton />
  </TopToolbar>
);

const itemListFilters = [
  <TextInput
    key="user-filter-firstName"
    label="Global Search"
    source="globalSearch"
  />,
];

export const Product = () => {
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedRecord(null);
    setIsModalOpen(false);
  };

  return (
    <>
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
          />
          <TextField source="itemName" label="Name" />
          <TextField
            source="itemDescription"
            label="Description"
            sortable={false}
            style={{ wordWrap: "anywhere", width: "150px", textWrap: "pretty" }}
          />
          <TextField source="location" label="Address" sortable={false} />
          <TextField source="askingPrice" label="Asking Price" />
          <FunctionField
            render={(rec) => {
              return rec.isSold ? "Yes" : "No";
            }}
            label="Sold"
          />
          <FunctionField
            render={(rec) => {
              return rec.user.firstName + " " + rec.user.lastName;
            }}
            label="Owner"
          />
          <FunctionField
            render={(rec) => (
              <ShowButton label="Show Images" onClick={(e) => openModal(rec)} />
            )}
            label="Images"
          />
        </Datagrid>
      </List>
      <Dialog fullWidth open={isModalOpen} onClose={closeModal}>
        {selectedRecord && selectedRecord.images && (
          <Carousel
            autoPlay={true}
            showArrows={true}
            showThumbs={false}
            swipeable={true}
            dynamicHeight={true}
          >
            {selectedRecord.images.map((img) => (
              <div key={img.id}>
                <img
                  style={{ height: "80vh", objectFit: "fill" }}
                  src={img.image_url}
                  alt="image"
                />
              </div>
            ))}
          </Carousel>
        )}
      </Dialog>
    </>
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
          <TextField source="askingPrice" label="Asking Price" />
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
              width: "150px",
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
          <Typography variant="h4">Listing Details</Typography>
          <TextField source="make" />
          <TextField source="model" />
          <TextField source="makeYear" />
          <FunctionField
            render={(rec) => {
              return "$" + rec.askingPrice;
            }}
            label="Price"
          />
          <TextField source="GCM" label="GCM" />
          <TextField source="GVM" label="GVM" />
          <TextField source="VIN" label="VIN" />
          <TextField source="enginePower" />
          <FunctionField
            render={(rec) => {
              return rec.odometer ? rec.odometer + " KM" : "-";
            }}
            label="Odometer"
          />
          <Typography variant="h4">Engine Details</Typography>
          <FunctionField
            render={(rec) => {
              return rec.horsePower ? rec.horsePower + " HP" : "-";
            }}
            label="Horse Power"
          />
          <TextField source="transmission" />
          <TextField source="cylinders" />
          <TextField source="drive" />
          <TextField source="suspension" />
          <TextField source="engineSize" />
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
            <Link
              style={{ textDecoration: "none" }}
              to={`/user/${userId}/show`}
            >
              Go to profile
            </Link>
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
