import React from "react";
import PropTypes from "prop-types";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CircleButton from "../CircleButton/CircleButton";
import ApiContext from "../ApiContext";
// import { countNotesForFolder } from "../notes-helpers";
import "./NoteListNav.css";

export default class NoteListNav extends React.Component {
  static contextType = ApiContext;

  render() {
    const { folders, notes } = this.context;
    // const test1 = folders.map((folder) =>
    //   countNotesForFolder(notes, folder.id)
    // );
    // console.log(test1);
    // console.log(folders);

    // const test2 = folders.map((folder) => {
    //   console.log(folder.id);
    // });

    // console.log(folders.id);

    // const countNotesForFoldertest = (notes = [], folderId) =>
    //   notes.filter((note) => note.folderId === folderId).length;

    // console.log(countNotesForFoldertest(notes, folders.id));

    // console.log(test2);

    // console.log(notes[0]);

    const countNotesForFolder = (notes = [], folderId) =>
      notes.filter((note) => note.folder_id === folderId).length;

    // const testFilter = (notes, folderId) =>
    //   notes.filter((note) => note.folder_id === folderId);

    return (
      <div className="NoteListNav">
        <ul className="NoteListNav__list">
          {folders.map((folder) => (
            <li key={folder.id}>
              <NavLink
                className="NoteListNav__folder-link"
                to={`/folder/${folder.id}`}
              >
                <span className="NoteListNav__num-notes">
                  {/* {notes.filter((note) => console.log(note.folder_id))} */}
                  {/* {console.log(folder.id)} */}
                  {/* {console.log(testFilter(notes, folder.id))} */}
                  {/* {console.log(notes[0].folder_id)} */}

                  {/* {console.log(countNotesForFolder(notes, folder.id))} */}

                  {countNotesForFolder(notes, folder.id)}
                </span>
                {folder.name}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="NoteListNav__button-wrapper">
          <CircleButton
            tag={Link}
            to="/add-folder"
            type="button"
            className="NoteListNav__add-folder-button"
          >
            <FontAwesomeIcon icon="plus" />
            <br />
            Folder
          </CircleButton>
        </div>
      </div>
    );
  }
}

NoteListNav.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  location: PropTypes.object,
};
