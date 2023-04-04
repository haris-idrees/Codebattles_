import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import '../components/Footer.css';
    

export default class Footer extends React.Component{
    render(){
        return(
            
            <footer>
                <div className="footer-content">
                    <h3>Code <span>Battles</span></h3>
                    <p>Join the ranks of the coding elite and test your skills in the ultimate programming competition</p>
                    <ul class="socials">
                        <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                        <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                        <li><a href="#"><i class="fa fa-google-plus"></i></a></li>
                        <li><a href="#"><i class="fa fa-youtube"></i></a></li>
                        <li><a href="#"><i class="fa fa-linkedin-square"></i></a></li>
                    </ul>
                </div>
                <div className="footer-bottom">
                    <p>copyright &copy;2023 codeBattles. designed by <span>PUCITIANS</span></p>
                </div>
            </footer>
        );
    }
}