import React from "react";
import Navbar from "./Navbar";
import StickyFooter from "./StickyFooter";
import './Competition.css';
import CompetitionPost from "./CompetitionPost";

export default function Competitions(){


    return(
        <>
          <div>
            <Navbar/><br/>
               <CompetitionPost isCompetitionPost={true}/><br/>
            <StickyFooter/>
          </div>
        </>
    );

}