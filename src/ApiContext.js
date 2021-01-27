
import React from 'react'
export default React.createContext({
  notes: [],
  folders: [],
  addFolder: (responseJson) => {console.log(responseJson)},
  addNote: (responseJson) => {console.log(responseJson)},
  deleteNote: () => {},
})