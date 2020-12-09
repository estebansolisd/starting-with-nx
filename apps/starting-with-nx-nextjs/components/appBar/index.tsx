import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

function AppBarComponent() {
  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6">
            TODO-APP
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
}

export default AppBarComponent;
