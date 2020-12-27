import React from "react";
import PropTypes from "prop-types";
import config from "../config";
import ApiContext from "../ApiContext";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

class AddNote extends React.Component {
  static defaultProps = {
    addNote: () => {},
  };
  static contextType = ApiContext;

  state = {
    newNoteName: "",
    notefulError: null,
    totalErrors: null,
    isFormValid: false,
    folderId: "",
    name: "",
    content: "",
    errors: {
      folderIdMessage: "Please choose a folder",
      nameMessage: "Please enter a name for your note",
      contentMessage: "Please enter note content",
    },
  };

  checkErrors = () => {
    let errorMessages = Object.values(this.state.errors);
    let count = errorMessages.length;
    if (this.state.folderId.length > 0) {
      count = count - 1;
      this.setState({ folderIdMessage: "" });
    }
    if (this.state.name !== "") {
      count = count - 1;
      this.setState((prevState) => ({
        errors: {
          ...prevState.errors,
          nameMessage: "",
        },
      }));
    }
    if (this.state.content !== "") {
      count = count - 1;
      this.setState((prevState) => ({
        errors: {
          ...prevState.errors,
          nameMessage: "",
        },
      }));
    }
    this.setState({ totalErrors: count });
    this.checkValidity();
  };

  checkValidity = () => {
    this.state.totalErrors === 0
      ? this.setState({ isFormValid: true })
      : this.setState({ isFormValid: false });
  };

  handleChange = (e) => {
    let { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      this.checkErrors();
    });
  };

  handleUpdateId = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    this.checkErrors();
  };

  handleAddNote = (e) => {
    e.preventDefault();
    if (this.state.totalErrors > 0) return;
    let { name, folderId, content } = e.target;
    const noteContents = {
      name: name.value,
      content: content.value,
      folderId: folderId.value,
    };
    if (this.state.totalErrors === 0) {
      fetch(`${config.API_ENDPOINT}/notes`, {
        method: "POST",
        body: JSON.stringify(noteContents),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => {
          if (!res.ok)
            return res.json().then((error) => {
              throw error;
            });
          return res.json();
        })
        .then((responseJson) => {
          name.value = "";
          content.value = "";
          folderId = "";
          this.context.addNote(responseJson);
        })
        .catch((error) => {
          this.setState(() => ({ notefulError: error }));
          console.error({ error });
        });
      alert("New note created!");
    } else {
      alert("Please fill out the remaining fields");
    }
  };

  render() {
    const folders = this.context.folders;

    if (this.state.notefulError === true) {
      return <p>{this.state.notefulError}</p>;
    }

    const mappedFolders = folders.map((folder) => (
      <option key={folder.id} value={folder.id}>
        {folder.name}
      </option>
    ));

    return (
      <form onSubmit={this.handleAddNote}>
        <h3 style={{ color: "white" }}>
          Please complete the form below by typing in the empty fields! Once
          submitted, click on the Noteful icon to return to the main page.
        </h3>
        <br />
        <ErrorBoundary>
          <select
            key={1}
            required
            id="folderId"
            value={mappedFolders.id}
            name="folderId"
            onChange={this.handleUpdateId}
          >
            <option key={1}>Choose a folder</option>
            {mappedFolders}
          </select>
        </ErrorBoundary>
        <br />
        <label htmlFor="name">
          <h3>Add a name for the note</h3>
        </label>
        <ErrorBoundary>
          <input
            required
            name="name"
            type="text"
            defaultValue=""
            onChange={this.handleChange}
            disabled={this.state.folderId === ""}
          />
        </ErrorBoundary>
        <label htmlFor="content">
          <h3>Add your note!</h3>
        </label>
        <ErrorBoundary>
          <input
            required
            name="content"
            onChange={this.handleChange}
            type="text"
            id="content"
            defaultValue=""
            disabled={this.state.name.length < 3}
          />
        </ErrorBoundary>
        <br />
        <button type="submit" disabled={!this.state.isFormValid}>
          Create Note
        </button>
        {this.state.totalErrors !== null ? (
          <p>Form is {this.state.isFormValid ? "VALID" : "INVALID"}</p>
        ) : null}
      </form>
    );
  }
}

AddNote.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  modified: PropTypes.string,
};

export default AddNote;
