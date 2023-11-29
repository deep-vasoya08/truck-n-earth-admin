import CloseIcon from "@mui/icons-material/Close";
import { Avatar } from "@mui/material";
import { useState } from "react";
import {
  Button,
  Confirm,
  DatagridConfigurable,
  FilterButton,
  List,
  SelectColumnsButton,
  TextField,
  TextInput,
  TopToolbar,
  useRecordContext,
  useRefresh,
} from "react-admin";

const UserListActions = () => (
  <TopToolbar>
    <SelectColumnsButton />
    <FilterButton />
  </TopToolbar>
);

const userListFilters = [
  <TextInput
    key="user-filter-firstName"
    label="Global Search"
    source="globalSearch"
  />,
];

export const User = () => (
  <List
    disableSyncWithLocation
    actions={<UserListActions />}
    filters={userListFilters}
    sort={{ field: "createdAt", order: "DESC" }}
  >
    <DatagridConfigurable bulkActionButtons={false}>
      <Avatar src={"profilePhoto"} alt="User" />
      <TextField source="firstName" />
      <TextField source="lastName" />
      <TextField source="country" />
      <TextField source="email" />
      <TextField source="mobile" />
      <BlockUserComponent label="Action" />
    </DatagridConfigurable>
  </List>
);

const BlockUserComponent = () => {
  const [open, setOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const record = useRecordContext();
  const refresh = useRefresh();

  return (
    <>
      <Button
        onClick={() => {
          console.log("hi");
        }}
        style={{
          color: "white",
          textAlign: "center",
          width: "100%",
          backgroundColor: record.PermanentBlock ? "#d32f2f" : "#2196f3",
        }}
        sx={{
          "& .MuiButton-startIcon": { marginLeft: "0px", marginRight: "0px" },
        }}
      >
        <>Block</>
      </Button>
      <Confirm
        isOpen={open}
        title="Confirm Action"
        content={confirmMessage}
        CancelIcon={CloseIcon}
        onConfirm={() => {
          console.log("confirm");
        }}
        onClose={() => setOpen(false)}
      />
    </>
  );
};
