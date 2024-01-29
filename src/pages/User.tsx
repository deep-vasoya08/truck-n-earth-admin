import CloseIcon from "@mui/icons-material/Close";
import {
  Avatar,
  Breadcrumbs,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import {
  Button,
  Confirm,
  DatagridConfigurable,
  FilterButton,
  FunctionField,
  List,
  ListButton,
  SelectColumnsButton,
  Show,
  SimpleShowLayout,
  TextField,
  TextInput,
  TopToolbar,
  useRecordContext,
  useRefresh,
} from "react-admin";
import "./UserShow.css"; // Import your CSS file

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
    emptyWhileLoading={true}
  >
    <DatagridConfigurable bulkActionButtons={false} rowClick="show">
      <UserAvatar label="Profile" />
      <TextField source="firstName" />
      <TextField source="lastName" />
      <TextField source="country" />
      <TextField source="email" />
      <TextField source="mobile" />
      {/* <BlockUserComponent label="Action" /> */}
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
    <Show actions={<ShowUserActions />} title="User">
      <Breadcrumbs>
        <Link href="/#/user">Home</Link>
        <Link href="/#/user">Users</Link>
      </Breadcrumbs>
      <SimpleShowLayout>
        <Paper>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Profile Image</TableCell>
                  <TableCell>
                    <UserAvatar label="Profile" />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell>
                    <FunctionField
                      render={(rec) => `${rec.firstName} ${rec.lastName}`}
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell>
                    <FunctionField
                      render={(rec) => (rec.email ? rec.email : "-")}
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Company</TableCell>
                  <TableCell>
                    <FunctionField
                      render={(rec) => (rec.company ? rec.company : "-")}
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Country</TableCell>
                  <TableCell>
                    <FunctionField
                      render={(rec) => (rec.country ? rec.country : "-")}
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Mobile</TableCell>
                  <TableCell>
                    <FunctionField
                      render={(rec) => (rec.mobile ? rec.mobile : "-")}
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Address</TableCell>
                  <TableCell>
                    <FunctionField
                      render={(rec) => (rec.address ? rec.address : "-")}
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>ABN</TableCell>
                  <TableCell>
                    <FunctionField
                      render={(rec) => (rec.ABN ? rec.ABN : "-")}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </SimpleShowLayout>
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
