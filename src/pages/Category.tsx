import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { TextField as Textfield } from "@mui/material";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  Button,
  Confirm,
  Create,
  CreateButton,
  DatagridConfigurable,
  DateField,
  DeleteWithConfirmButton,
  Edit,
  FilterButton,
  FunctionField,
  List,
  ListButton,
  SaveButton,
  SelectColumnsButton,
  Show,
  SimpleForm,
  TabbedShowLayout,
  TextField,
  TextInput,
  Toolbar,
  TopToolbar,
  required,
  useCreate,
  useNotify,
  useRecordContext,
  useRedirect,
  useRefresh,
  useUpdate,
} from "react-admin";
import { useParams } from "react-router-dom";
import { BASE_URL } from ".././common/envs";
import { customAuthProvider } from "../App";
import { http } from "../common/utils";

const CategoryListActions = () => (
  <TopToolbar>
    <SelectColumnsButton />
    <CreateButton />
    <FilterButton />
  </TopToolbar>
);

const categoryListFilters = [
  <TextInput
    key="category-filter-name"
    label="Global Search"
    source="globalSearch"
  />,
];

export const Category = () => (
  <List
    disableSyncWithLocation
    actions={<CategoryListActions />}
    filters={categoryListFilters}
    sort={{ field: "createdAt", order: "DESC" }}
  >
    <DatagridConfigurable bulkActionButtons={false} rowClick="show">
      <TextField source="categoryName" />
      <DateField source="createdAt" />
    </DatagridConfigurable>
  </List>
);

const CreateCategoryActions = () => {
  return (
    <TopToolbar>
      <CreateButton />
    </TopToolbar>
  );
};

export const CreateCategory = () => {
  const notify = useNotify();
  const [create, { data, error }] = useCreate();
  const redirect = useRedirect();
  const save = async (data: any) => {
    create("category", { data });
  };

  useEffect(() => {
    if (error) {
      notify(`${error.message}`, { type: "error" });
    }
    if (data && !error) {
      notify("Category created successfully", { type: "success" });
      redirect("/category");
    }
  }, [data, error]);

  try {
    return (
      <Create actions={<CreateCategoryActions />}>
        <SimpleForm onSubmit={save}>
          <TextInput
            source="categoryName"
            label="Category Name"
            validate={required("Category Name is required")}
          />
        </SimpleForm>
      </Create>
    );
  } catch (error) {
    console.log(error);
  }
};

const EditToolbar = () => {
  return (
    <Toolbar>
      <SaveButton label="Save" type="submit" variant="text" />
    </Toolbar>
  );
};

const EditActions = () => {
  const redirect = useRedirect();
  const notify = useNotify();
  const record = useRecordContext();
  return (
    <TopToolbar>
      <ListButton />
      <DeleteWithConfirmButton
        confirmTitle={`Delete ${record.keyword}?`}
        mutationOptions={{
          onSuccess: () => {
            notify("Category Deleted", {
              type: "success",
            });
            redirect("/category");
          },
          onError: (error) => {
            notify(error.message, {
              type: "error",
            });
          },
        }}
      />
    </TopToolbar>
  );
};

const CreateSubCategory = () => {
  const [open, setOpen] = useState(false);
  const notify = useNotify();
  const refresh = useRefresh();
  const [name, setName] = useState("");
  const { id } = useParams();

  const submit = async () => {
    try {
      const token = await customAuthProvider.getJWTToken();
      const res = await http(`${BASE_URL}/category/sub-category`, {
        method: "POST",
        body: JSON.stringify({
          categoryName: name,
          categoryId: id,
        }),
        headers: new Headers({ Authorization: `Bearer ${token}` }),
      });
      notify(res.json.message);
      handleClose();
      setName("");
      refresh();
    } catch (error) {
      setName("");
      notify(error.message, { type: "error" });
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        label="Create"
        startIcon={<AddIcon />}
      />
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Create Subcategory</DialogTitle>
        <DialogContent>
          <Textfield
            id="outlined-basic"
            label="Enter name"
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} label="Cancle" />
          <Button autoFocus onClick={submit} label="Create" />
        </DialogActions>
      </Dialog>
    </>
  );
};

const CategoryShowActions = () => {
  return (
    <TopToolbar>
      <CreateSubCategory />
    </TopToolbar>
  );
};

export const ShowCategory = () => {
  const { id } = useParams();
  const filter = { id: id };
  const redirect = useRedirect();
  const notify = useNotify();
  const [update, { data, error }] = useUpdate();
  const updateCategory = (newData) => {
    update("category", { id: newData.id, data: newData });
  };
  useEffect(() => {
    if (error) {
      console.log(error);
      notify(error.message, {
        type: "error",
      });
    }
    if (data && !error) {
      notify("category updated", {
        type: "success",
      });
      redirect("/category");
    }
  }, [data, error]);
  return (
    <>
      <Show>
        <TabbedShowLayout>
          <TabbedShowLayout.Tab label="Edit">
            <Edit actions={<EditActions />} title="Edit Category">
              <SimpleForm toolbar={<EditToolbar />} onSubmit={updateCategory}>
                <TextInput
                  source="categoryName"
                  label="Category Name"
                  validate={required("Category Name is required")}
                />
              </SimpleForm>
            </Edit>
          </TabbedShowLayout.Tab>
          <TabbedShowLayout.Tab label="Subcategories">
            <List
              actions={<CategoryShowActions />}
              resource="subCategory"
              filter={filter}
            >
              <DatagridConfigurable>
                <TextField source="name" />
                <DateField source="createdAt" />
                <FunctionField
                  label="Edit"
                  render={(record) => {
                    return <EditCategory record={record} />;
                  }}
                />
                <FunctionField
                  label="Delete"
                  render={(record) => {
                    return <DeleteSubCategory record={record} />;
                  }}
                />
              </DatagridConfigurable>
            </List>
          </TabbedShowLayout.Tab>
        </TabbedShowLayout>
      </Show>
    </>
  );
};

export const EditCategory = ({ record }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const refresh = useRefresh();
  const notify = useNotify();

  const openDialog = () => {
    setOpen(true);
  };

  const handleClick = async () => {
    try {
      if (name.length >= 1) {
        const payload = {
          categoryName: name.trim(),
        };
        const token = await customAuthProvider.getJWTToken();
        await http(`${BASE_URL}/category/sub-category/${record.id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
          headers: new Headers({ Authorization: `Bearer ${token}` }),
        });
        refresh();
        setName("");
        setOpen(false);
      } else {
        alert("name must be contain at least 1 char.");
      }
    } catch (error) {
      setName("");
      notify(error.message, { type: "error" });
    }
  };
  return (
    <>
      <Button
        type="button"
        variant="contained"
        onClick={openDialog}
        label="Edit"
      />
      <Confirm
        CancelIcon={CloseIcon}
        isOpen={open}
        title="Edit"
        content={
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontWeight: "normal" }}>
              Category Name: &nbsp;
              <span style={{ fontWeight: "bold" }}>{record.name}</span>
            </span>
            <div style={{ margin: "10px" }}></div>
            <textarea
              id="name-input"
              placeholder="enter new name"
              style={{
                outline: "none",
                borderRadius: "5px",
                height: "25px",
                maxWidth: "100%",
                maxHeight: "100%",
              }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        }
        onConfirm={() => {
          handleClick();
        }}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

const DeleteSubCategory = ({ record }) => {
  const [open, setOpen] = useState(false);
  const refresh = useRefresh();
  const notify = useNotify();
  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = async () => {
    try {
      const token = await customAuthProvider.getJWTToken();
      const res = await http(`${BASE_URL}/category/sub-category/${record.id}`, {
        method: "DELETE",
        headers: new Headers({ Authorization: `Bearer ${token}` }),
      });
      notify(res.json.message, { type: "success" });
      refresh();
      setOpen(false);
    } catch (error) {
      notify(error.message, { type: "error" });
    }
  };
  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        label="Delete"
        color="error"
        type="button"
        variant="contained"
      />
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Delete Subcategory</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} label="Cancle" />
          <Button
            autoFocus
            color="error"
            label="Delete"
            onClick={handleClick}
          />
        </DialogActions>
      </Dialog>
    </>
  );
};
