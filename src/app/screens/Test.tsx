// @ts-nocheck
import React, { Component } from "react";
class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: "Ford",
      model: "Mustang",
      color: "red",
      year: 1964,
    };
  }
  changeDetail = () => {
    this.setState({
      color: "blue",
      brand: "Tesla",
      module: "Model S",
      year: 2023,
    });
  };

  componentDidMount() {
    console.log("componentDidMount");
    // runs after first render
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
    // runs befroe component unmount
  }
  componentDidUpdate() {}

  render() {
    return (
      <div>
        <h1>My {this.state.brand}</h1>
        <p>
          Color: {this.state.color} - Model: {this.state.model}
          from {this.state.year}.
        </p>
        <button type="button" onClick={this.changeDetail}>
          Change Detail
        </button>
      </div>
    );
  }
}
export default Test;