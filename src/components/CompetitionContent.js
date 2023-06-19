import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import StickyFooter from "./StickyFooter";
import './CompetitionContent.css';
import ProfilePost from "./ProfilePost";
import Footer from "./Footer";
import {CloudinaryImage} from '@cloudinary/url-gen';
import {AdvancedImage} from '@cloudinary/react';
import { Link,useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import APIServices from "../APIServices";


export default function CurrentCompetition(){

    const navigate = useNavigate();
    const { competionId: ID } = useParams();

    const [comp,setComp] = useState([]);

    useEffect(() => {
        APIServices.getCompbyID(ID)
            .then(users => {
                setComp(users);
                console.log('Hello',users)
            })
            .catch(error => {
                alert("Error in fetching users");
            });

    }, []);


    

    

    return(
        <>
          <div className='competition_hero'>
            <Navbar/><br/>
               {/* competiton cart here */}
               <div class="cart">
                
                <div class="cart-image">
                    <AdvancedImage cldImg= {new CloudinaryImage('11CoverPicture_prcrnr', {cloudName: 'drvo4uxiv'})} className="cart-image"/>
                </div>
                <div class="cart-content">
                    <h3 class="cart-title">{comp.description}</h3>
                    <p class="cart-description">Elgibility criteria</p>
                    <button onClick={() => navigate(`/test/${ID}`)}>Participate</button>
                    
                </div>
                </div>
            <Footer/>
          </div>
        </>
    );

}