import {
  DatagridConfigurable,
  DateField,
  FilterButton,
  FunctionField,
  List,
  SelectColumnsButton,
  TextField,
  TextInput,
  TopToolbar,
} from "react-admin";

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
      filters={historyListFilters}
      disableSyncWithLocation
      sort={{ field: "createdAt", order: "DESC" }}
    >
      <DatagridConfigurable bulkActionButtons={false}>
        <TextField source="item.itemName" label="Item Name" />
        <TextField source="item.askingPrice" label="Price" />
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
