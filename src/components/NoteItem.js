import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
const NoteItem = (props) => {
    const {deleteNote} = useContext(noteContext);
    const { note, updateNote } = props;
    return (
        <>
            <div className="card col-sm-4 mx-2 my-1" style={{ width: "18rem" }}>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <span className="badge rounded-pill text-bg-primary">{note.tag}</span>
                    <p className="card-text">{note.description}</p>
                </div>
                <div className="card-footer">
                    <div className="btns row ">
                        <div className="col-3">
                            <a href="#" className="btn btn-sm btn-primary" onClick={()=> {updateNote(note)}} >Edit</a>
                        </div>
                        <div className="col-4">
                            <a href="#" className="btn btn-sm btn-danger" onClick={()=> {deleteNote(note._id)}}>Delete</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoteItem;