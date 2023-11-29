import {
  DatagridConfigurable,
  DateField,
  FunctionField,
  List,
} from "react-admin";

export const ReportedUsers = () => {
  return (
    <List disableSyncWithLocation>
      <DatagridConfigurable bulkActionButtons={false}>
        <FunctionField
          render={(rec) => {
            return rec.reporter.firstName + " " + rec.reporter.lastName;
          }}
          sortable={false}
          label="Reporter"
        />
        <FunctionField
          render={(rec) => {
            return rec.reported.firstName + " " + rec.reported.lastName;
          }}
          sortable={false}
          label="Reported"
        />
        <FunctionField
          render={(rec) => {
            return rec.reason.reason;
          }}
          sortable={false}
          label="Reason"
        />
        <DateField sortable={false} label="Report time" source="reportedAt" />
      </DatagridConfigurable>
    </List>
  );
};
