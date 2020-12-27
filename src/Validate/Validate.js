import React from "react";

class Validate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h2>Error {this.state.error} encountered, please try again.</h2>;
    }
    return this.props.children;
  }
}

export default Validate;