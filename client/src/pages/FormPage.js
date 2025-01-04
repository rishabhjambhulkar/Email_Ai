import React from "react";
import { useForm } from "react-hook-form";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Alert,
} from "@mui/material";

const FormPage = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [alert, setAlert] = React.useState({ message: "", severity: "" });

  const onSubmit = async (data) => {
    console.log("onSubmit", data);
    try {
      const response = await fetch("http://localhost:4000/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to save data");
      }
      setAlert({ message: "Data saved successfully!", severity: "success" });
      reset(); // Reset form after successful submission
    } catch (error) {
      setAlert({ message: error.message, severity: "error" });
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "40px" }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        User Form
      </Typography>
      {alert.message && (
        <Alert severity={alert.severity} style={{ marginBottom: "20px" }}>
          {alert.message}
        </Alert>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              {...register("name", { required: "Name is required" })}
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Date of Birth"
              type="date"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              {...register("dob", { required: "Date of Birth is required" })}
              error={!!errors.dob}
              helperText={errors.dob ? errors.dob.message : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              {...register("email", { 
                required: "Email is required", 
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Entered value does not match email format",
                } 
              })}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default FormPage;
