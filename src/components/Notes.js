import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';


const Notes = ({showAlert}) => {
    const context = useContext(noteContext);
    const { editNote, fetchNotes, notes } = context;
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

    useEffect(() => {
        fetchNotes()
    }, [])

    const update_btn = useRef(null);
    const close_btn = useRef(null);

    const updateNote = (currentNote) => {
        update_btn.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }

    const handleClick = () => {
        console.log("updateing the note...", note);
        editNote(note.id, note.etitle, note.edescription, note.etag);
        close_btn.current.click();

        for (let i = 0; i < notes.length; i++) {
            if (notes[i]._id === note.id) {
                notes[i].title = note.etitle;
                notes[i].description = note.edescription;
                notes[i].tag = note.etag;
                break;
            }
        }
        showAlert("Updated Successfully","success")
        setNote(notes);

    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.id]: e.target.value })
    }

    return (
        <>
            <button type="button" ref={update_btn} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Update Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="row mb-3">
                                    <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} onChange={onChange} />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
                                    <div className="col-sm-10">
                                        <textarea name="edescription" className='form-control' id="edescription" value={note.edescription} onChange={onChange} cols="30" ></textarea>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="tag" className="col-sm-2 col-form-label">Tag</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
                                    </div>
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={close_btn} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="notes-con row mx-auto">
                {notes.map((note) => {
                    return (
                        <NoteItem note={note} key={note._id} updateNote={updateNote} showAlert = {showAlert} />
                    )
                })}
            </div>
        </>
    )
}

export default Notes;