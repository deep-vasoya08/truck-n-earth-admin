import {
  DatagridConfigurable,
  DateField,
  ExportButton,
  FilterButton,
  FunctionField,
  List,
  SelectColumnsButton,
  TextField,
  TextInput,
  TopToolbar,
} from "react-admin";

const ListActions = () => (
  <TopToolbar>
    <FilterButton />
    <SelectColumnsButton />
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
        <DateField source="createdAt" label="Raised Date" sortable={false} />
      </DatagridConfigurable>
    </List>
  );
};
