import React from 'react'
import { useEffect } from 'react'
import AddNote from './AddNote'
import Notes from './Notes'
import { useNavigate  } from "react-router-dom";


export default function Home({showAlert}) {    

    return (
        <div>
            <div className="container my-2">
            <AddNote showAlert = {showAlert}/>
                <div className="recent-notes mt-4">
                    <h4>Recent Notes</h4>
                    <hr className='mt-0' />
                    <div className="notes_container border rounded p-2">
                        <Notes showAlert = {showAlert} />
                    </div>
                </div>
            </div>
        </div>
    )
}
