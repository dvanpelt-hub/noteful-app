import React from "react";
import PropTypes from "prop-types";
import Note from "../Note/Note";
import ApiContext from "../ApiContext";
import { findNote } from "../notes-helpers";
import "./NotePageMain.css";
import NoteListMain from "../NoteListMain/NoteListMain";

export default class NotePageMain extends React.Component {
  static defaultProps = {
    match: {
      params: {},
    },
  };
  static contextType = ApiContext;

  handleDeleteNote = (noteId) => {
    this.props.history.push(`/`);
  };

  render() {
    console.log(this.props);
    const { notes = [] } = this.context;
    const { noteId } = this.props.match.params;
    const note = findNote(notes, noteId) || { content: "" };
    return (
      <section className="NotePageMain">
        <Note
          id={note.id}
          name={note.name}
          modified={note.modified}
          onDeleteNote={this.handleDeleteNote}
        />
        <div className="NotePageMain__content">
          {note.content.split(/\n \r|\n/).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>
    );
  }
}

NoteListMain.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  location: PropTypes.object,
};
