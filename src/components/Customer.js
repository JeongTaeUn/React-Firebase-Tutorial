import React from "react";

class Customer extends React.Component {
  render() {
    return (
      <div>
        <CustomerProfile
          id={this.props.id}
          name={this.props.name}
          imageUrl={this.props.imageUrl}
        />
        <CustomerInfo
          name={this.props.name}
          birthday={this.props.birthday}
          job={this.props.job}
          gender={this.props.gender}
        />
      </div>
    );
  }
}

class CustomerProfile extends React.Component {
  render() {
    return (
      <div>
        <img src={this.props.imageUrl} alt="profile" />
        <h2>
          {this.props.name}
          {this.props.id}
        </h2>
      </div>
    );
  }
}

class CustomerInfo extends React.Component {
  render() {
    return (
      <div>
        <h2>{this.props.name}</h2>
        <p>{this.props.birthday}</p>
        <p>{this.props.job}</p>
        <h2>{this.props.gender}</h2>
      </div>
    );
  }
}

export default Customer;
