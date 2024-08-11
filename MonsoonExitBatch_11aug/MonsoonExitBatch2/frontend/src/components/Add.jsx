import { Box, Button, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Add = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isUpdate = location.state && location.state.data; // checking
  const [inputs, setInputs] = useState({
    EmpName: "",
    designation: "",
    empId:"",
    img_url: "",
  });

  useEffect(() => {
    if (isUpdate) {
      
      setInputs(location.state.data);
    }
  }, [isUpdate, location.state]);

  const inputHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (isUpdate) {
      // Update data
      axios
        .put(`http://localhost:3001/update/${location.state.data._id}`, inputs)
        .then((res) => {
          alert(res.data.message);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // Add new data
      axios
        .post("http://localhost:3001/add", inputs)
        .then((res) => {
          alert(res.data.message);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "90vh",
        }}
      >
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "600px",
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Name"
            onChange={inputHandler}
            name="EmpName"
            value={inputs.EmpName}
            fullWidth
          />
          <TextField
            variant="outlined"
            placeholder="Designation"
            onChange={inputHandler}
            name="designation"
            value={inputs.designation}
            multiline
            rows={4}
            fullWidth
          />
          <TextField
            variant="outlined"
            placeholder="Employee ID"
            onChange={inputHandler}
            name="empId"
            value={inputs.empId}
            fullWidth
          />
          <TextField
            variant="outlined"
            placeholder="Image URL"
            onChange={inputHandler}
            name="img_url"
            value={inputs.img_url}
            fullWidth
          />

          <Button variant="contained" color="secondary" onClick={handleSubmit}>
            {isUpdate ? 'Update' : 'Submit'}
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Add;
