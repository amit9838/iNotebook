import React, {useContext} from 'react'
import { useEffect } from 'react';
import noteContext from '../context/notes/noteContext'

const About = () => {
  const a = useContext(noteContext);
  useEffect(() => {
    a.update();
  }, [])
  
  return (
    <div>This page is about </div>
  )
}

export default About