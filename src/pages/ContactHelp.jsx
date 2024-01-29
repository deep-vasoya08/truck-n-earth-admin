import {
  DatagridConfigurable,
  DateField,
  ExportButton,
  FunctionField,
  List,
  TextField,
  TextInput,
  TopToolbar,
} from "react-admin";

const ListActions = () => (
  <TopToolbar>
    <ExportButton />
  </TopToolbar>
);

const ListFilters = [
  <TextInput key="item-filter" label="Global Search" source="globalSearch" />,
];

export const ContactHelpList = () => {
  return (
    <List
      disableSyncWithLocation
      actions={<ListActions />}
      filters={ListFilters}
    >
      <DatagridConfigurable bulkActionButtons={false}>
        <TextField source="id" label="Sr.no" sortable={false} />
        <TextField source="name" sortable={false} />
        <TextField source="email" sortable={false} />
        <FunctionField
          render={(rec) => (rec.phoneNumber ? rec.phoneNumber : "-")}
          label="Phone Number"
        />
        <TextField source="message" sortable={false} />
        <DateField
          source="createdAt"
          label="Raised Date"
          sortable={false}
          locales="en-GB"
          options={{ year: "numeric", month: "short", day: "numeric" }}
        />
      </DatagridConfigurable>
    </List>
  );
};
