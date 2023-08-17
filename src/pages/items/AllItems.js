import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DataGrid from "material-react-table";
import { useNavigate } from "react-router-dom";

const departmentListOption = [
  {
    label: "Department - 1",
    value: "Department - 1",
  },
  {
    label: "Department - 2",
    value: "Department - 2",
  },
  {
    label: "Department - 3",
    value: "Department - 3",
  },
];

const AllItems = () => {
  const navigate = useNavigate();

  const [itemList, setItemList] = useState([]);
  const [itemDetails, setItemDetails] = useState({
    ItemCode: "",
    Description: "",
    Price: "",
    Quantity: "",
    Department: "",
  });

  const [searchInput, setSearchInput] = useState("");
  const [searchItemList, setSearchItemList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const itemColumns = [
    {
      accessorKey: "ItemCode",
      header: "Item Code",
    },
    {
      accessorKey: "Description",
      header: "Description",
    },
    {
      accessorKey: "Price",
      header: "Price",
    },
    {
      accessorKey: "Quantity",
      header: "Quantity",
    },
    {
      accessorKey: "Department",
      header: "Department",
    },

    {
      accessorKey: "Edit",
      header: "Edit",
      Cell: ({ cell }) => {
        return (
          <Button
            onClick={() =>
              navigate(`item-edit/${window.btoa(cell.row.original.ItemCode)}`)
            }
          >
            Edit
          </Button>
        );
      },
    },
  ];

  useEffect(() => {
    const tempData = localStorage.getItem("itemList");
    console.log("tempData...........", tempData);
    if (tempData && tempData?.length > 0) {
      setItemList(JSON.parse(tempData));
    }
  }, []);

  const onSearchData = (searchValue) => {
    setSearchInput(searchValue);
    if (searchValue.length > 0) {
      let tempList = [...itemList];
      tempList = tempList.filter((value) =>
        value.ItemCode.includes(searchValue)
      );
      setSearchItemList(tempList);
    } else {
      setSearchItemList([]);
    }
  };

  const onHandleItemDetails = (event) => {
    const { name, value } = event.target;
    setErrorMessage("");
    setItemDetails((oldData) => {
      return {
        ...oldData,
        [name]: value,
      };
    });
  };

  const saveItemData = () => {
    let tempList = [...itemList];

    if (itemDetails.ItemCode.length === 0) {
      setErrorMessage("Please enter Item Code");
      return;
    }
    if (itemDetails.Description.length === 0) {
      setErrorMessage("Please enter Description");
      return;
    }
    if (itemDetails.Price.length === 0) {
      setErrorMessage("Please enter Price");
      return;
    }
    if (itemDetails.Quantity.length === 0) {
      setErrorMessage("Please enter Quantity");
      return;
    }

    if (itemDetails.Department.length === 0) {
      setErrorMessage("Please select Department");
      return;
    }
    setErrorMessage("");
    tempList.push(itemDetails);
    console.log("itemDetails........", itemDetails);
    setItemList(tempList);
    localStorage.setItem("itemList", JSON.stringify(tempList));
    setItemDetails({
      ItemCode: "",
      Description: "",
      Price: "",
      Quantity: "",
      Department: "",
    });
  };

  return (
    <>
      <div>
        <h2>Create item</h2>

        {errorMessage.length > 0 && (
          <Typography variant="body2" sx={{ color: "red", my: 2 }}>
            {errorMessage}
          </Typography>
        )}

        <Grid container spacing={3}>
          <Grid item sm={12} md={6}>
            <TextField
              label="Item Code"
              required
              type="text"
              name={"ItemCode"}
              value={itemDetails?.ItemCode}
              onChange={onHandleItemDetails}
              fullWidth
            />
          </Grid>

          <Grid item sm={12} md={6}>
            <TextField
              label="Description"
              required
              name={"Description"}
              multiline
              rows={4}
              value={itemDetails?.Description}
              onChange={onHandleItemDetails}
              fullWidth
            />
          </Grid>

          <Grid item sm={12} md={6}>
            <TextField
              label="Price"
              required
              type="number"
              name={"Price"}
              value={itemDetails?.Price}
              onChange={onHandleItemDetails}
              fullWidth
            />
          </Grid>

          <Grid item sm={12} md={6}>
            <TextField
              label="Quantity"
              required
              type="number"
              name={"Quantity"}
              value={itemDetails?.Quantity}
              onChange={onHandleItemDetails}
              fullWidth
            />
          </Grid>

          <Grid item sm={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="department-list-label">
                Select Department
              </InputLabel>

              <Select
                labelId="department-list-label"
                id="department-list"
                value={itemDetails?.Department}
                name="Department"
                onChange={onHandleItemDetails}
                fullWidth
                label="Select Department"
              >
                {departmentListOption.map((value, index) => {
                  return (
                    <MenuItem value={value.value} key={index}>
                      {value.label}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={12} md={6}>
            <Button variant="contained" onClick={saveItemData}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </div>

      <div>
        <h2>All items</h2>

        <TextField
          label="Search By Item Code"
          name={"Search"}
          value={searchInput}
          onChange={(event) => onSearchData(event.target.value)}
          sx={{ mb: 2 }}
        />

        <DataGrid
          enableColumnActions={false}
          enableSorting={false}
          columns={itemColumns}
          autoResetPageIndex={false}
          enablePagination={true}
          data={searchInput.length > 0 ? searchItemList : itemList}
        />
      </div>
    </>
  );
};

export default AllItems;
