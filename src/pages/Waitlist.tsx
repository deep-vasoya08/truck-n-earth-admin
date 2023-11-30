import CloseIcon from "@mui/icons-material/Close";
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

const WaitListActions = () => (
  <TopToolbar>
    <SelectColumnsButton />
    <FilterButton />
  </TopToolbar>
);

const waituserListFilters = [
  <TextInput
    key="user-filter-firstName"
    label="Global Search"
    source="globalSearch"
  />,
];

export const Waitlist = () => (
  <List
    disableSyncWithLocation
    actions={<WaitListActions />}
    filters={waituserListFilters}
  >
    <DatagridConfigurable bulkActionButtons={false}>
      <TextField source="email" width="90%" />
      {/* <SendMail label="Action" /> */}
    </DatagridConfigurable>
  </List>
);

// send mail/s
// TODO:
const SendMail: any = () => {
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
        }}
        sx={{
          "& .MuiButton-startIcon": { marginLeft: "0px", marginRight: "0px" },
          alignItems: "center",
        }}
        variant="contained"
      >
        <>Send Mail</>
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
