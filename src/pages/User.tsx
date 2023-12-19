import CloseIcon from "@mui/icons-material/Close";
import { Avatar } from "@mui/material";
import { useState } from "react";
import {
  Button,
  Confirm,
  DatagridConfigurable,
  FilterButton,
  List,
  ListButton,
  SelectColumnsButton,
  Show,
  TabbedShowLayout,
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
    <DatagridConfigurable bulkActionButtons={false} rowClick="show">
      <UserAvatar label="Profile" />
      <TextField source="firstName" />
      <TextField source="lastName" />
      <TextField source="country" />
      <TextField source="email" />
      <TextField source="mobile" />
      <BlockUserComponent label="Action" />
    </DatagridConfigurable>
  </List>
);

const ShowUserActions = () => (
  <TopToolbar>
    <ListButton />
  </TopToolbar>
);

export const ShowUser = () => {
  return (
    <Show actions={<ShowUserActions />}>
      <TabbedShowLayout>
        <TabbedShowLayout.Tab label="asd">
          <TextField source="name" />
        </TabbedShowLayout.Tab>
      </TabbedShowLayout>
    </Show>
  );
};

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

const UserAvatar = () => {
  const record = useRecordContext();
  const url = record.profilePhoto ? record.profilePhoto : undefined;
  return (
    <Avatar
      src={url}
      sx={{ width: 50, height: 50 }}
      alt={`${record.firstName}`}
    />
  );
};
