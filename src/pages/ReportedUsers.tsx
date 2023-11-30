import {
  DatagridConfigurable,
  DateField,
  FunctionField,
  List,
} from "react-admin";

export const ReportedUsers = () => {
  return (
    <List resource="report" disableSyncWithLocation>
      <DatagridConfigurable bulkActionButtons={false}>
        <FunctionField
          render={(rec) => {
            return rec.reported.firstName + " " + rec.reported.lastName;
          }}
          sortable={false}
          label="Reported User"
        />
        <FunctionField
          render={(rec) => {
            return rec.reporter.firstName + " " + rec.reporter.lastName;
          }}
          sortable={false}
          label="Reported By"
        />
        <FunctionField
          render={(rec) => {
            return rec.reason.reason;
          }}
          sortable={false}
          label="Reason"
        />
        <DateField sortable={false} label="Reported On" source="reportedAt" />
      </DatagridConfigurable>
    </List>
  );
};
