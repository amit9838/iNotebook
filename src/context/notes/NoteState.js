import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000"
    let initialNotes = []

    const [notes, setNotes] = useState(initialNotes)
    // Add a new note
    const fetchNotes = async() => {
        console.log("fetching notes")
        const url = "/api/notes/allnotes"
        const response = await fetch(`${host}${url}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkMGFkZjZjZTE5YjhmMzg5YmNiM2E2In0sImlhdCI6MTY3NDkwMDI2OH0.Gq7vXz_K7myuUsoZuAS5m4-fXOKOHHt1FsCAUgIBkiA'
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
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkMGFkZjZjZTE5YjhmMzg5YmNiM2E2In0sImlhdCI6MTY3NDkwMDI2OH0.Gq7vXz_K7myuUsoZuAS5m4-fXOKOHHt1FsCAUgIBkiA'
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
                    'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkMGFkZjZjZTE5YjhmMzg5YmNiM2E2In0sImlhdCI6MTY3NDkwMDI2OH0.Gq7vXz_K7myuUsoZuAS5m4-fXOKOHHt1FsCAUgIBkiA'
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
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkMGFkZjZjZTE5YjhmMzg5YmNiM2E2In0sImlhdCI6MTY3NDkwMDI2OH0.Gq7vXz_K7myuUsoZuAS5m4-fXOKOHHt1FsCAUgIBkiA'
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