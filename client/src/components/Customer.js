import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import CustomerDelete from "./CustomerDelete";

class Customer extends React.Component {
  render() {
    return (
      <TableRow>
        <TableCell>{this.props.id}</TableCell>
        <TableCell>
          <img
            src={this.props.imageUrl}
            alt="profile"
            width="64"
            height="48"
          />
        </TableCell>
        <TableCell>{this.props.name}</TableCell>
        <TableCell>{this.props.job}</TableCell>
        <TableCell>{this.props.gender}</TableCell>
        <TableCell>{this.props.birthday}</TableCell>
        <TableCell>
          <CustomerDelete name={this.props.name} action={this.props.action} />
        </TableCell>
      </TableRow>
    );
  }
}

export default Customer;
