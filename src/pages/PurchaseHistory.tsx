import { Divider } from "@mui/material";
import { useState } from "react";
import {
  Button,
  DatagridConfigurable,
  DateField,
  FilterButton,
  FunctionField,
  List,
  ListButton,
  SelectColumnsButton,
  Show,
  TabbedShowLayout,
  TextField,
  TextInput,
  TopToolbar,
} from "react-admin";
import { Link } from "react-router-dom";

const HistoryListActions = () => (
  <TopToolbar>
    <SelectColumnsButton />
    <FilterButton />
  </TopToolbar>
);

const historyListFilters = [
  <TextInput
    key="user-filter-firstName"
    label="Global Search"
    source="globalSearch"
  />,
];

export const PurchaseHistory = () => {
  return (
    <List
      actions={<HistoryListActions />}
      filters={historyListFilters}
      disableSyncWithLocation
      sort={{ field: "createdAt", order: "DESC" }}
    >
      <DatagridConfigurable bulkActionButtons={false} rowClick="show">
        <FunctionField
          render={(rec) => {
            return "#" + rec.item.id;
          }}
          label="Listing"
        />
        <TextField source="item.itemName" label="Listing Name" />
        <FunctionField
          render={(rec) => {
            return "$ " + rec.item.askingPrice;
          }}
          label="Price"
        />
        <FunctionField
          render={(rec) => {
            return rec.seller.firstName + " " + rec.seller.lastName;
          }}
          label="Seller"
        />
        <FunctionField
          render={(rec) => {
            return rec.buyer.firstName + " " + rec.buyer.lastName;
          }}
          label="Buyer"
        />
        <DateField
          source="purchaseDate"
          label="Puchased Date"
          sortBy="createdAt"
        />
      </DatagridConfigurable>
    </List>
  );
};

const ShowHistoryActions = () => (
  <TopToolbar>
    <ListButton />
  </TopToolbar>
);

export const ShowPurchaseHistory = () => {
  const [itemId, setItemId] = useState(null);
  const [sellerId, setSellerId] = useState(null);
  const [buyerId, setBuyerId] = useState(null);

  return (
    <Show actions={<ShowHistoryActions />}>
      <TabbedShowLayout divider={<Divider flexItem />}>
        <TabbedShowLayout.Tab label="Summary">
          <FunctionField
            render={(rec) => {
              setItemId(rec.item.id);
              return "#" + rec.item.id;
            }}
            label="Listing id"
          />
          <TextField source="item.itemName" label="Item name" />
          <FunctionField
            render={(rec) => "$" + rec.item.askingPrice}
            label="Item price"
          />
          <DateField
            source="purchaseDate"
            label="PurchasedAt"
            options={{
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            }}
          />
          <Button>
            <Link
              style={{ textDecoration: "none" }}
              to={`/listing/${itemId}/show`}
            >
              Go to Listing
            </Link>
          </Button>
        </TabbedShowLayout.Tab>
        <TabbedShowLayout.Tab label="Seller Details">
          <FunctionField
            render={(rec) => {
              setSellerId(rec.seller.id);
              return rec.seller.id;
            }}
            label="id"
          />
          <TextField source="seller.firstName" label="First Name" />
          <TextField source="seller.lastName" label="Last Name" />
          <FunctionField
            render={(rec) => {
              return rec.seller.email ? rec.seller.email : "-";
            }}
            label="Email"
          />
          <Button>
            <Link
              style={{ textDecoration: "none" }}
              to={`/user/${buyerId}/show`}
            >
              Go to profile
            </Link>
          </Button>
        </TabbedShowLayout.Tab>
        <TabbedShowLayout.Tab label="Buyer Details">
          <FunctionField
            render={(rec) => {
              setBuyerId(rec.buyer.id);
              return rec.buyer.id;
            }}
            label="id"
          />
          <TextField source="buyer.firstName" label="First Name" />
          <TextField source="buyer.lastName" label="Last Name" />
          <FunctionField
            render={(rec) => {
              return rec.buyer.email ? rec.buyer.email : "-";
            }}
            label="Email"
          />
          <Button>
            <Link
              style={{ textDecoration: "none" }}
              to={`/user/${sellerId}/show`}
            >
              Go to profile
            </Link>
          </Button>
        </TabbedShowLayout.Tab>
      </TabbedShowLayout>
    </Show>
  );
};
