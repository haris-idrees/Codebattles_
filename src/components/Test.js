import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const Test = () => {

    const { testID: ID } = useParams();
    const [details, setDetails] = useState([]);

    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/get_problems/', {
                params: {
                    competition_id: ID,
                },
            })
            .then((res) => {
                const data = res.data.problems;
                console.log('Data fetched from API:', data);
                setDetails(data);
            })
            .catch((err) => {
                console.log('Error fetching data from API:', err);
            });
        // const handleBeforeUnload = (event) => {
        //     event.preventDefault();
        //     event.returnValue = '';
        // };

        // const handleVisibilityChange = () => {
        //     if (document.visibilityState !== 'visible') {
        //         alert('Please stay on this page!');
        //         // You can also redirect to another page or perform some action here
        //         window.location.href = '/locked-page';
        //     }
        // };

        // window.addEventListener('beforeunload', handleBeforeUnload);
        // document.addEventListener('visibilitychange', handleVisibilityChange);

        // return () => {
        //     window.removeEventListener('beforeunload', handleBeforeUnload);
        //     document.removeEventListener('visibilitychange', handleVisibilityChange);
        // };
    }, []);

    const unlockPage = () => {
        window.removeEventListener('beforeunload', null);
        document.removeEventListener('visibilitychange', null);
        window.location.href = '/competition';
    };

    return (
        <div>
            <h1>Locked Page</h1>
            <h2>{ID}</h2>
            <p>This page cannot be closed or navigated away until unlocked.</p>
            <button onClick={unlockPage}>Submit</button>
        </div>
    );
};

export default Test;
