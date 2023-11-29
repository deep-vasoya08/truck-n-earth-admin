import { Dialog } from "@mui/material";
import { useState } from "react";
import {
  Datagrid,
  FilterButton,
  FunctionField,
  List,
  SelectColumnsButton,
  ShowButton,
  TextField,
  TextInput,
  TopToolbar,
} from "react-admin";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ItemListActions = () => (
  <TopToolbar>
    <SelectColumnsButton />
    <FilterButton />
  </TopToolbar>
);

const itemListFilters = [
  <TextInput
    key="user-filter-firstName"
    label="Global Search"
    source="globalSearch"
  />,
];

export const Item = () => {
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedRecord(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <List
        disableSyncWithLocation
        actions={<ItemListActions />}
        filters={itemListFilters}
        sort={{ field: "createdAt", order: "DESC" }}
      >
        <Datagrid bulkActionButtons={false}>
          <TextField source="itemTitle" label="Title" />
          <TextField source="itemName" label="Name" />
          <TextField
            source="itemDescription"
            label="Description"
            sortable={false}
            style={{ wordWrap: "anywhere", width: "150px", textWrap: "pretty" }}
          />
          <TextField source="location" label="Address" sortable={false} />
          <TextField source="askingPrice" label="Asking Price" />
          <FunctionField
            render={(rec) => {
              return rec.isSold ? "Yes" : "No";
            }}
            label="Sold"
          />
          <FunctionField
            render={(rec) => {
              return rec.user.firstName + " " + rec.user.lastName;
            }}
            label="Owner"
          />
          <FunctionField
            render={(rec) => (
              <ShowButton label="Show Images" onClick={(e) => openModal(rec)} />
            )}
            label="Images"
          />
        </Datagrid>
      </List>
      <Dialog fullWidth open={isModalOpen} onClose={closeModal}>
        {selectedRecord && selectedRecord.images && (
          <Carousel
            autoPlay={true}
            showArrows={true}
            showThumbs={false}
            swipeable={true}
            dynamicHeight={true}
          >
            {selectedRecord.images.map((img) => (
              <div key={img.id}>
                <img
                  style={{ height: "80vh", objectFit: "fill" }}
                  src={img.image_url}
                  alt="image"
                />
              </div>
            ))}
          </Carousel>
        )}
      </Dialog>
    </>
  );
};
