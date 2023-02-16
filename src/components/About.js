import React, { useContext } from 'react'
import { useEffect } from 'react';
import noteContext from '../context/notes/noteContext'

const About = () => {
  const a = useContext(noteContext);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center mt-5">
          <h1>About Us</h1>
          <p className="lead">
            This is a note-taking website built on the latest and greatest technologies, including node.js and react.js.
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <h2>Our Mission</h2>
          <p>
            Our mission is to provide an easy-to-use platform for people to save and share their notes with ease.
            We want to help people stay organized and collaborate with others, no matter where they are.
          </p>
        </div>
        <div className="col-md-6">
          <h2>Our Vision</h2>
          <p>
            Our vision is to become the go-to website for note-taking and collaboration. We want to be the one-stop-shop for
            students, teachers, business professionals, and anyone who needs to take notes and share them with others.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About