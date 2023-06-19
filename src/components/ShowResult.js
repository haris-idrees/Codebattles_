import React, { useEffect, useState } from 'react'
import APIServices from '../APIServices'
import Navbar from './HomeNavbar';
import Footer from './StickyFooter';

function ShowResult() {
    const loggedIn_id = sessionStorage.getItem('id');
    const [result, setResult] = useState([]);
    useEffect(() => {
        APIServices.getUserResults(loggedIn_id)
            .then(users => {
                setResult(users); // Update the state with the fetched posts
                console.log(users);
                
                const updatedResults = users.map(user => {
                    const resultArray = user.result.split(','); // Split the comma-separated pass/fail values into an array
                    const passCount = resultArray.filter(status => status === 'pass').length; // Count the number of "pass" statuses
                    const totalCount = resultArray.length; // Get the total count of statuses

                    const passPercentage = (passCount / totalCount) * 100; // Calculate the pass percentage
                    const failPercentage = 100 - passPercentage; // Calculate the fail percentage

                    return { ...user, passPercentage }; // Append the pass percentage to the user result object
                });
                console.log("Updated", updatedResults);
                setResult(updatedResults);
            })
            .then(() => console.log('Results fetched'))
            .catch(error => {
                alert('Error in fetching results');
            });
    }, []);

    return (
        <div>
        <Navbar></Navbar>
        <div  style={{padding:'200px'}} className='container'>

            <table className='table table-responsive'>
                <thead className='table-success'>
                    <tr>
                        <th>Competition Name</th>
                        <th>Result</th>
                    </tr>
                </thead>
                <tbody>
                {result.length > 0 ? (
                        <tr>
                            <td>{result[0].competition_name}</td>
                            <td>{result[0].passPercentage}%</td>
                            
                        </tr>
                    ) : (
                        <tr>
                            <td colSpan="2">No results available</td>
                        </tr>
                    )}
                </tbody>

            </table>
        </div>
        <Footer></Footer>
        </div>

    )
}

export default ShowResult
