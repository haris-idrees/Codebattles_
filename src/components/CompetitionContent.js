import React from "react";
import Navbar from "./Navbar";
import StickyFooter from "./StickyFooter";
import './CompetitionContent.css';
import ProfilePost from "./ProfilePost";
import Footer from "./Footer";
import {CloudinaryImage} from '@cloudinary/url-gen';
import {AdvancedImage} from '@cloudinary/react';
import { Link,useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


export default function CurrentCompetition(){

    const navigate = useNavigate();
    const { competionId: ID } = useParams();

    return(
        <>
          <div className='competition_hero'>
            <Navbar/><br/>
               {/* competiton cart here */}
               <div class="cart">
                <h1>{ID}</h1>
                <div class="cart-image">
                    <AdvancedImage cldImg= {new CloudinaryImage('11CoverPicture_prcrnr', {cloudName: 'drvo4uxiv'})} className="cart-image"/>
                </div>
                <div class="cart-content">
                    <h3 class="cart-title">Competition Description</h3>
                    <p class="cart-description">Elgibility criteria</p>
                    <button onClick={() => navigate(`/test/${ID}`)}>Participate</button>
                    
                </div>
                </div>
            <Footer/>
          </div>
        </>
    );

}