import { Breadcrumbs, Divider } from "@mui/material";
import Link from "@mui/material/Link";
import { useState } from "react";
import {
  Button,
  DatagridConfigurable,
  DateField,
  ExportButton,
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
import { Link as LinkDOM } from "react-router-dom";

const HistoryListActions = () => (
  <TopToolbar>
    <SelectColumnsButton />
    <FilterButton />
    <ExportButton />
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
            return "#" + rec.item.listingNumber;
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
          locales="en-GB"
          options={{ year: "numeric", month: "short", day: "numeric" }}
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
    <Show actions={<ShowHistoryActions />} title="Purchase">
      <Breadcrumbs>
        <Link href="/#/user">Home</Link>
        <Link href="/#/purchase">Purchases</Link>
      </Breadcrumbs>
      <TabbedShowLayout divider={<Divider flexItem />}>
        <TabbedShowLayout.Tab label="Summary">
          <FunctionField
            render={(rec) => {
              setItemId(rec.item.id);
              return "#" + rec.item.listingNumber;
            }}
            label="Listing id"
          />
          <TextField source="item.itemName" label="Item name" />
          <FunctionField
            render={(rec) => "$" + rec.item.askingPrice}
            label="Listing price"
          />
          <DateField
            source="purchaseDate"
            label="Purchased On"
            locales="en-GB"
            options={{ year: "numeric", month: "short", day: "numeric" }}
          />
          <DateField
            source="item.createdAt"
            label="Listed On"
            locales="en-GB"
            options={{ year: "numeric", month: "short", day: "numeric" }}
          />
          <FunctionField
            render={(rec) => {
              return rec.item.delivery
                ? rec.item.delivery == "SELLER_ORGANISED"
                  ? "Seller Organized"
                  : "Buyer Organized"
                : "-";
            }}
            label="Delivery"
          />
          <Button>
            <LinkDOM
              style={{ textDecoration: "none" }}
              to={`/approved-product/${itemId}/show`}
            >
              Go to Listing
            </LinkDOM>
          </Button>
        </TabbedShowLayout.Tab>
        <TabbedShowLayout.Tab label="Seller Details">
          <TextField source="seller.firstName" label="First Name" />
          <TextField source="seller.lastName" label="Last Name" />
          <FunctionField
            render={(rec) => {
              setSellerId(rec.seller.id);
              return rec.seller.email ? rec.seller.email : "-";
            }}
            label="Email"
          />
          <FunctionField
            render={(rec) => {
              return rec.seller.mobile ? rec.seller.mobile : "-";
            }}
            label="Mobile"
          />
          <TextField source="sellerAccId" label="Seller Account ID" />
          <TextField source="sellerCustomerId" label="Seller Customer ID" />
          <Button>
            <LinkDOM
              style={{ textDecoration: "none" }}
              to={`/user/${sellerId}/show`}
            >
              Go to profile
            </LinkDOM>
          </Button>
        </TabbedShowLayout.Tab>
        <TabbedShowLayout.Tab label="Buyer Details">
          <TextField source="buyer.firstName" label="First Name" />
          <TextField source="buyer.lastName" label="Last Name" />
          <FunctionField
            render={(rec) => {
              setBuyerId(rec.buyer.id);
              return rec.buyer.email ? rec.buyer.email : "-";
            }}
            label="Email"
          />
          <FunctionField
            render={(rec) => {
              return rec.seller.mobile ? rec.seller.mobile : "-";
            }}
            label="Mobile"
          />
          <Button>
            <LinkDOM
              style={{ textDecoration: "none" }}
              to={`/user/${buyerId}/show`}
            >
              Go to profile
            </LinkDOM>
          </Button>
        </TabbedShowLayout.Tab>
      </TabbedShowLayout>
    </Show>
  );
};
