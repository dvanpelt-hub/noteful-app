import React from "react";
import config from "../config";

class AddFolder extends React.Component {

  state = {
    newFolderName: "",
  };

  handleFolderNameChange = (e) => {
    let { value } = e.target;
    this.setState({
      newFolderName: value,
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
        this.context.addFolder(responseJson);
        this.props.history.push("/");
      })
      .catch((error) => {
        console.error({ error });
      });
    alert("You've added a new folder!");
    console.log("New folder created!");
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
        <button type="submit">Enter!</button>
      </form>
    );
  }
}

export default AddFolder;
