import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";

const TablePage = () => {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/data");
      if (!response.ok) {
        throw new Error("Failed to fetch data from server");
      }
      const data = await response.json();
      console.log(data);
      setFormData(data.users); // Update state with fetched data
    } catch (err) {
      setError(err.message); // Set error message
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  // Call fetchData when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Function to calculate age from date of birth
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Adjust age if the birth month hasn't occurred yet this year
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Delete handler
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      try {
        const response = await fetch(`http://localhost:4000/api/data/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete the data");
        }

        // Remove the deleted entry from state
        setFormData((prevData) => prevData.filter((data) => data._id !== id));
        alert("Entry deleted successfully!");
      } catch (err) {
        console.error("Error deleting data:", err);
        alert("Failed to delete entry: " + err.message);
      }
    }
  };

  // Render loading state or error message
  if (loading) {
    return (
      <Container style={{ textAlign: "center", marginTop: "20px" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container style={{ marginTop: "20px" }}>
        <Alert severity="error">Error: {error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="p-4" maxWidth="lg">
      <Typography variant="h4" component="h2" gutterBottom>
        User Data
      </Typography>
      {formData.length > 0 ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              {/* <TableCell>Date of Birth</TableCell> */}
              <TableCell>Age</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell> {/* Add Actions column */}
            </TableRow>
          </TableHead>
          <TableBody>
            {formData.map((data) => (
              <TableRow key={data._id}>
                <TableCell>{data.name}</TableCell>
                {/* <TableCell>{data.dob}</TableCell> */}
                <TableCell>{calculateAge(data.dob)}</TableCell>
                <TableCell>{data.email}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(data._id)} // Pass _id to delete handler
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography variant="body1">No data available.</Typography>
      )}
    </Container>
  );
};

export default TablePage;
