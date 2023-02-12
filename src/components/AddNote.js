import React, { useContext,useState } from 'react'
import noteContext from '../context/notes/noteContext'
// import Alert from './Alert';

function AddNote(props) {

    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({title : "", description : "", tag : ""});

    const handleClick = (e) => {
        e.preventDefault();
        if(note.title.length<5){
            
        }
        else if(note.description.length<5) {
            // <Alert message={"Description must be minimum 5 charactes!"}/>
        }
        else{
            addNote(note.title,note.description,note.tag);
            props.showAlert("Note Added!" , "success");
            e.title = ''
            e.description = ''
            e.tag = ''
        }
    }

    const onChange = (e) => {
        setNote({...note, [e.target.name]:e.target.value})
    }

    return (
        <>
            <div className="form-container container border rounded px-4 py-2 my-2 col-sm-10 mx-auto" >
                <div className="iNotebook mt-2">
                    <h3>iNotebook</h3>
                    <hr className='mt-0' />
                </div>
                <form>
                    <div className="row mb-3">
                        <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="title" name='title' onChange={onChange} />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
                        <div className="col-sm-10">
                            <textarea name="description" className='form-control' id="description" onChange={onChange} cols="30" ></textarea>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="tag" className="col-sm-2 col-form-label">Tag</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="tag" name='tag' onChange={onChange} />
                        </div>
                    </div>
                    <div className="bnt_section row">
                        <div className="col-sm-10"></div>
                        <button type="submits" className="btn btn-primary col-sm-2" onClick={handleClick}>+ Add</button>
                    </div>
                </form>
            </div>

        </>
    )
}

export default AddNote