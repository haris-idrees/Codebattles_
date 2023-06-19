import React from "react-dom";
import desktop_wallpaper from "../desktop_wallpaper.jpg";
import './ProfilePost.css';
import { Link } from 'react-router-dom';
import APIServices from "../APIServices";
import { useEffect, useState } from "react";
import { CloudinaryImage } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { useNavigate } from "react-router-dom";

export default function CompetitionPost() {

    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        APIServices.getAllCompetitions()
          .then(users => {
            setPosts(users); // Update the state with the fetched posts
          })
          .then(() => console.log("Competiion Fetched")) // Move the console.log inside the .then block
          .catch(error => {
            alert("Error in data fetching");
          });
      }, []);
  
  return (
    <>
      <div className="post_css">
        {posts.map(post => (

          <div className="f-card" key={post.id}>
            <div className="header">
              <div className="options">
                <i className="fa fa-chevron-down"></i>
              </div>
              
              <div >
                <h2 style={{color:"black"}}>{post.name}</h2>
              </div>
              <div className="time">
                <p>{post.description}</p> 
              </div>
            </div>
            <div className="content">
              <p>
               
              </p>
            </div>

            <div className="reference">
            <img src="https://res.cloudinary.com/drvo4uxiv/image/upload/10ProfilePicture_hptfyy" className="reference-thumb"/>
            </div>
            <center>
                <button onClick={() => navigate(`/competition/${post.id}`)}>View</button>
            </center>
            
          </div>
        ))}
      </div>

    </>
  );
}
