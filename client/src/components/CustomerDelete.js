import React from "react";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
} from "@material-ui/core";

class CustomerDelete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  async deleteCustomer(name) {
    const url = "api/customers/" + name;
    const response = await fetch(url, {
      method: "DELETE",
    });
    const data = await response.json();
    this.props.action(data);
    this.handleClickClose();
  }

  handleClickOpen = () => {
    this.setState((state) => ({ open: true }));
  };

  handleClickClose = () => {
    this.setState((state) => ({ open: false }));
  };

  render() {
    return (
      <>
        <Button
          variant="contained"
          color="secondary"
          onClick={this.handleClickOpen}
        >
          Delete
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClickClose}
          noderef={null}
        >
          <DialogTitle>Confirm Delete Customer</DialogTitle>
          <DialogContent>
            <Typography gutterBottom>Are Sure Delete Customer Info?</Typography>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => this.deleteCustomer(this.props.name)}
            >
              Delete
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={this.handleClickClose}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default CustomerDelete;
