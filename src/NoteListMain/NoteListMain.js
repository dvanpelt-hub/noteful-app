import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Note from "../Note/Note";
import CircleButton from "../CircleButton/CircleButton";
import ApiContext from "../ApiContext";
import { getNotesForFolder } from "../notes-helpers";
import "./NoteListMain.css";

export default class NoteListMain extends React.Component {
  static defaultProps = {
    match: {
      params: {},
    },
  };
  static contextType = ApiContext;

  render() {
    const { folderId } = this.props.match.params;
    const { notes } = this.context;
    const folderIdNum = parseInt(folderId);
    const notesForFolder = getNotesForFolder(notes, folderIdNum);

    return (
      <section className="NoteListMain">
        <ul>
          {notesForFolder.map((note) => (
            <li key={note.id}>
              <Note id={note.id} name={note.name} modified={note.modified} />
            </li>
          ))}
        </ul>
        <div className="NoteListMain__button-container">
          <CircleButton
            tag={Link}
            to="/add-note"
            type="button"
            className="NoteListMain__add-note-button"
          >
            <FontAwesomeIcon icon="plus" />
            <br />
            Note
          </CircleButton>
        </div>
      </section>
    );
  }
}

NoteListMain.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object.isRequired,
  location: PropTypes.object,
};
