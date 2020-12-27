import React from "react";
import PropTypes from "prop-types";
import ApiContext from '../ApiContext';
import config from "../config";

class AddFolder extends React.Component {

  static contextType = ApiContext;

  state = {
    newFolderName: "",
    validForm: false
  };

  handleFolderNameChange = (e) => {
    let { value } = e.target;
    this.setState({
      newFolderName: value,
      validForm: true
    });
  };

  handleAddFolder = (e) => {
    e.preventDefault();
    const newFolder = {
      name: this.state.newFolderName,
    };

    fetch(`${config.API_ENDPOINT}/folders`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newFolder),
    })
      .then((res) => {
        if (!res.ok)
          return res.json().then((error) => {
            throw error;
          });
        return res.json();
      })
      .then((responseJson) => {
        this.setState({validForm: true});
          this.context.addFolder(responseJson);
          this.props.history.push("/");
      })
      .catch((error) => {
        console.error({ error });
      });
    alert("You've added a new folder!");
  };

  render() {
    return (
      <form onSubmit={this.handleAddFolder}>
        <h3 style={{ color: "white" }}>
          Type in a new folder name. Once created, click on the Noteful icon to
          return to the main page.
        </h3>
        <br />
        <input
          onChange={this.handleFolderNameChange}
          id="newFolder"
          type="text"
          name="newFolderName"
        />
        <br />
        <button type="submit" disabled={this.state.validForm === false}>Enter!</button>
      </form>
    );
  }
}

AddFolder.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
};

export default AddFolder;
