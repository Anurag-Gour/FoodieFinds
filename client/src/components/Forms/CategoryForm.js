import React from "react";
import TextField from "@mui/material/TextField";
import { Box, Button } from "@mui/material";
const CategoryForm = ({ handleSubmit, value, setValue, action }) => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Enter new category"
          variant="outlined"
          value={value}
          fullWidth
          onChange={(e) => setValue(e.target.value)}
          sx={{ marginBottom: "1rem" }}
        />
        <Button variant="contained" onClick={handleSubmit}>
          {action}
        </Button>
      </Box>
    </>
  );
};

export default CategoryForm;
