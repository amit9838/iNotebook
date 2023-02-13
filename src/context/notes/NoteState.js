import React, { useState } from "react";
import NoteContext from "./noteContext";


const NoteState = (props) => {
    const host = "http://localhost:5000"
    let initialNotes = []
    const authToken = localStorage.getItem('authToken');
    
    const [notes, setNotes] = useState(initialNotes)
    // Add a new note
    const fetchNotes = async() => {
        console.log("fetching notes")
        const url = "/api/notes/allnotes"
        const response = await fetch(`${host}${url}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authToken
            },
            
        });
        const json =  await response.json();
        let fetched_notes = await json;
        console.log(fetched_notes)
        setNotes(fetched_notes);
    }

    const addNote = async (title, description, tag) => {
        // TODO: api call
        console.log("adding note...")
        const url = "/api/notes/addnote"
        const response = await fetch(`${host}${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authToken
            },
            body: JSON.stringify({title,description,tag})
        });
        const json = await response.json();
        
        await setNotes(notes.concat(json));
    }

    const editNote = async (id, title, description,tag) => {
        // API call
            const url = "/api/notes/updatenote/"
            const response = await fetch(`${host}${url}${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': authToken
                },
                body: JSON.stringify({title,description,tag})
            });
            const json =  await response.json();
            return json;
    }


    const deleteNote = async(id) => {
        console.log("Deleting note with id " + id);

        console.log("adding note...")
        const url = "/api/notes/deletenote/"
        const response = await fetch(`${host}${url}${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authToken
            },
        });
        const json = await response.json();

        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes);
    }



    return (
        <NoteContext.Provider value={{ notes, setNotes, fetchNotes,addNote,editNote ,deleteNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;