import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1, textAlign: "center" }}>
          My Application
        </Typography>
        {/* <Button color="inherit" component={Link} to="/">
          Form Page
        </Button>
        <Button color="inherit" component={Link} to="/table">
          Table Page
        </Button> */}
        <Link to="/job-applications">Manage Job Applications</Link>
        <Link to="/skill-analysis">Analyze Skill Gaps</Link>
        <Link to="/growth-progress">Monitor Progress</Link>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
