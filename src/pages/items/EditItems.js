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
import { useNavigate, useParams } from "react-router-dom";

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

const EditItems = () => {
  const { itemCode } = useParams();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const [itemDetails, setItemDetails] = useState({
    ItemCode: "",
    Description: "",
    Price: "",
    Quantity: "",
    Department: "",
  });

  useEffect(() => {
    const editId = window.atob(itemCode);
    let tempData = localStorage.getItem("itemList");

    if (tempData && tempData?.length > 0) {
      tempData = JSON.parse(tempData);
      tempData = tempData.filter((value) => value.ItemCode === editId);
      console.log("tempData..........", tempData[0]);
      setItemDetails(tempData[0]);
    }
  }, []);

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
    let tempData = localStorage.getItem("itemList");
    let tempList = JSON.parse(tempData);
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
    const itemIndex = tempList.findIndex(
      (value) => value.ItemCode === itemDetails.ItemCode
    );
    if (itemIndex > -1) {
      tempList[itemIndex] = itemDetails;
      console.log("itemDetails........", itemDetails);

      localStorage.setItem("itemList", JSON.stringify(tempList));
    }
  };

  return (
    <div>
      <h2>Edit item</h2>

      <Button onClick={() => navigate("/")} variant="contained" sx={{ mb: 3 }}>
        Back
      </Button>

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
            disabled
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
  );
};

export default EditItems;
