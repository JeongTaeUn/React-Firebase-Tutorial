import React from "react";

class CustomerDelete extends React.Component {
  async deleteCustomer(id) {
    const url = "api/customers/" + id;
    const response = await fetch(url, {
      method: "DELETE",
    });
    const data = await response.json();
    this.props.action(data);
  }

  render() {
    return (
      <button
        onClick={(e) => {
          this.deleteCustomer(this.props.id);
        }}
      >
        delete
      </button>
    );
  }
}

export default CustomerDelete;
