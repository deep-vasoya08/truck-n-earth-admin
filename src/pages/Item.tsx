import CloseIcon from "@mui/icons-material/Close";
import {
  Avatar,
  Breadcrumbs,
  Dialog,
  DialogContent,
  Divider,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import Link from "@mui/material/Link";
import axios from "axios";
import React, { useState } from "react";
import {
  Button,
  Confirm,
  Datagrid,
  DateField,
  ExportButton,
  FilterButton,
  FunctionField,
  List,
  ListButton,
  Show,
  TabbedShowLayout,
  TextField,
  TextInput,
  TopToolbar,
  useNotify,
  useRecordContext,
  useRedirect,
  useRefresh,
} from "react-admin";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link as LinkDOM } from "react-router-dom";
import { authProvider } from "../App";
import * as envs from "../common/envs";

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
      <Datagrid bulkActionButtons={false}>
        <FunctionField
          render={(rec) => {
            return "#" + rec.listingNumber;
          }}
          label="Listing"
          sortBy="id"
          sortable={true}
        />
        <TextField source="itemName" label="Name" />
        <TextField source="category" label="Category" />
        <FunctionField
          render={(rec) => (rec.subCategory ? rec.subCategory : "-")}
          label="Subcategory"
        />
        <DateField
          source="createdAt"
          label="Listed On"
          sortable={false}
          locales="en-GB"
          options={{ year: "numeric", month: "short", day: "numeric" }}
        />
        <DateField
          source="expiresAt"
          label="Expires On"
          sortable={false}
          locales="en-GB"
          options={{ year: "numeric", month: "short", day: "numeric" }}
        />
        <FunctionField
          render={(rec) => "$" + rec.askingPrice}
          label="Listing Price"
        />
        <FunctionField
          render={(rec) => "$" + rec.listingFees}
          label="Listing Fees"
        />
        <TextField source="owner" label="Owner" />
        <DisableItem label="Action" />
        <GotoItem label="View" />
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
    <Show actions={<ShowProductActions />} title="Product">
      <Breadcrumbs>
        <Link href="/#/user">Home</Link>
        <Link href="/#/approved-product">Products</Link>
      </Breadcrumbs>
      <TabbedShowLayout divider={<Divider flexItem />}>
        <TabbedShowLayout.Tab label="summary">
          <FunctionField
            render={(rec) => {
              return "#" + rec.listingNumber;
            }}
            label="Listing"
          />
          <TextField source="itemName" label="Name" />
          <TextField source="address" label="Address" sortable={false} />
          <FunctionField
            render={(rec) => {
              return "$" + rec.askingPrice;
            }}
            label="Listing Price"
          />
          <FunctionField
            render={(rec) => {
              return "$" + rec.listingFees == null ? 0 : rec.listingFees;
            }}
            label="Listing Fees"
          />
          <DateField
            source="createdAt"
            label="Listed On"
            sortable={false}
            locales="en-GB"
            options={{ year: "numeric", month: "short", day: "numeric" }}
          />
          <DateField
            source="expiresAt"
            label="Expires On"
            sortable={false}
            locales="en-GB"
            options={{ year: "numeric", month: "short", day: "numeric" }}
          />
          <FunctionField
            render={(rec) => {
              return rec.isSold ? "Yes" : "No";
            }}
            label="Sold"
          />
          <FunctionField
            render={(rec) => (rec.itemDescription ? rec.itemDescription : "-")}
            style={{
              wordWrap: "anywhere",
              width: "fit-content",
              textWrap: "pretty",
            }}
            label="Description"
            sortable={false}
          />
          <FunctionField
            render={(rec) => rec.user?.firstName + " " + rec.user?.lastName}
            label="Owner"
          />
        </TabbedShowLayout.Tab>
        <TabbedShowLayout.Tab label="Details">
          <Typography variant="h4">General Information</Typography>
          <TextField source="make" />
          <TextField source="model" />
          <TextField source="makeYear" />
          <FunctionField
            render={(rec) => (rec.VIN ? rec.VIN : "-")}
            label="VIN"
          />
          <FunctionField
            render={(rec) => {
              return rec.odometer
                ? `${rec.odometer} ${rec.HRS ? "HRS" : "KMS"}`
                : "-";
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
                ? rec.registered == "null"
                  ? "No"
                  : rec.registered
                : "-";
            }}
            label="Registerd"
          />
          <FunctionField
            render={(rec) => {
              return rec.registrationExpires ? rec.registrationExpires : "-";
            }}
            label="Registration Number"
          />
          <FunctionField
            render={(rec) => {
              return rec.delivery == "SELLER_ORGANISED"
                ? "Seller Organized"
                : "Buyer Organized";
            }}
            label="Delivery Type"
          />
          <FunctionField
            render={(rec) => (rec.rating ? rec.rating : "-")}
            label="Vehicle rating"
          />
          <FunctionField
            render={(rec) =>
              rec.isUnderFinance
                ? rec.isUnderFinance == "null"
                  ? "-"
                  : rec.isUnderFinance
                : "-"
            }
            label="Under Finance"
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
            render={(rec) => (rec.engineSize ? rec.engineSize : "-")}
            label="Engine Size"
          />
          <FunctionField
            render={(rec) =>
              rec.fuelType ? (rec.fuelType == "null" ? "-" : rec.fuelType) : "-"
            }
            label="Fuel Type"
          />
          <FunctionField
            render={(rec) =>
              rec.transmission
                ? rec.transmission == "null"
                  ? "-"
                  : rec.transmission
                : "-"
            }
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
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ImageList
      cols={4}
      sx={{
        overflow: "hidden",
      }}
    >
      {record.images.map((img: { id: number; image_url: string }) => (
        <ImageListItem key={img.image_url}>
          <img
            style={{
              height: "auto",
              width: "100%",
              margin: "2px",
              border: "2px solid black",
              cursor: "pointer",
            }}
            srcSet={img.image_url}
            src={img.image_url}
            alt="image"
            loading="lazy"
            onClick={() => handleImageClick(img.image_url)}
          />
        </ImageListItem>
      ))}
      <Dialog open={open} onClose={handleClose}>
        <DialogContent sx={{ padding: "0px" }}>
          <img
            src={selectedImage}
            alt="zoomed-in image"
            style={{ width: "100%" }}
          />
        </DialogContent>
      </Dialog>
    </ImageList>
  );
};

type GotoItemProps = {
  label: string;
};

const GotoItem: React.FC<GotoItemProps> = () => {
  const record = useRecordContext();
  const redirect = useRedirect();
  return (
    <Button
      onClick={() => {
        redirect(`/approved-product/${record.id}/show`);
      }}
      variant="contained"
      color="primary"
    >
      View
    </Button>
  );
};

type DisableItemProps = {
  label: string;
};

const DisableItem: React.FC<DisableItemProps> = () => {
  const [open, setOpen] = useState(false);
  const record = useRecordContext();
  const notify = useNotify();
  const refresh = useRefresh();

  const handleClick = async () => {
    const url = envs.BASE_URL;
    const token = await authProvider.getJWTToken();
    try {
      const response = await axios({
        url: `${url}/admin/item/${record.id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status == 200) {
        notify("Item deleted successfully", { type: "success" });
        setOpen(false);
        refresh();
      } else {
        notify(response.data.message, { type: "error" });
        setOpen(false);
      }
    } catch (error) {
      setOpen(false);
      notify(error.response.data.message, { type: "error" });
    }
  };

  return (
    <>
      <Button
        sx={{ padding: "5px" }}
        onClick={() => setOpen(true)}
        variant="contained"
        color="error"
      >
        <span style={{ fontSize: "small", marginRight: "-8px" }}>Delete</span>
      </Button>
      <Confirm
        isOpen={open}
        title="Delete the product?"
        content="Are you sure you want to delete this listed product? This action cannot be undone. The product owner will be notified via email about this rejection."
        CancelIcon={CloseIcon}
        onConfirm={() => handleClick()}
        onClose={() => {
          setOpen(false);
        }}
        confirm="Confirm"
      />
    </>
  );
};
