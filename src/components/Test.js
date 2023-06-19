// import React, { useEffect, useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import axios from 'axios';

// const Test = () => {

//     const { testID: ID } = useParams();
//     const [details, setDetails] = useState([]);

//     useEffect(() => {
//         axios
//             .get('http://127.0.0.1:8000/get_problems/', {
//                 params: {
//                     competition_id: ID,
//                 },
//             })
//             .then((res) => {
//                 const data = res.data.problems;
//                 console.log('Data fetched from API:', data);
//                 setDetails(data);
//             })
//             .catch((err) => {
//                 console.log('Error fetching data from API:', err);
//             });
//         // const handleBeforeUnload = (event) => {
//         //     event.preventDefault();
//         //     event.returnValue = '';
//         // };

//         // const handleVisibilityChange = () => {
//         //     if (document.visibilityState !== 'visible') {
//         //         alert('Please stay on this page!');
//         //         // You can also redirect to another page or perform some action here
//         //         window.location.href = '/locked-page';
//         //     }
//         // };

//         // window.addEventListener('beforeunload', handleBeforeUnload);
//         // document.addEventListener('visibilitychange', handleVisibilityChange);

//         // return () => {
//         //     window.removeEventListener('beforeunload', handleBeforeUnload);
//         //     document.removeEventListener('visibilitychange', handleVisibilityChange);
//         // };
//     }, []);

//     const unlockPage = () => {
//         window.removeEventListener('beforeunload', null);
//         document.removeEventListener('visibilitychange', null);
//         window.location.href = '/competition';
//     };

//     return (
//         <div>
//             <h1>Locked Page</h1>
//             <h2>{ID}</h2>
//             <p>This page cannot be closed or navigated away until unlocked.</p>
//             <button onClick={unlockPage}>Submit</button>
//         </div>
//     );
// };

// export default Test;


import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import APIServices from '../APIServices';
import './Test.css';

const Test = () => {
    const { testID: ID } = useParams();

    const [details, setDetails] = useState([]);
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');

    const [Prob_names, setname] = useState('');
    const [Prob_descriptions, setProbDescriptions] = useState('');
    const [Prob_id, setid] = useState('');
    const [Prob_img, setimg] = useState('');
    const [result, setresult] = useState('');
    const [iterator, setiterator] = useState(0);
    const [showSubmit, setShowSubmit] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/get_problems/', {
                params: {
                    competition_id: ID,
                },
            })
            .then((res) => {
                const data = res.data.problems;

                setDetails(data);
                setname(data[iterator]?.Prob_name || '');
                setProbDescriptions(data[iterator]?.Prob_description || '');

                if (iterator === data.length - 1) {
                    setShowSubmit(true);
                }
            })
            .catch((err) => {
                console.log('Error fetching data from API:', err);
            });

            const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue = '';
        };

        const handleVisibilityChange = () => {
            if (document.visibilityState !== 'visible') {
                alert('Please stay on this page!');
                // You can also redirect to another page or perform some action here
                window.location.href = '/locked-page';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    const handleRunPython = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/run_python/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    code: code,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setOutput(data.output);
                setError('');
            } else {
                setOutput(data.error);
                setError('');
            }
        } catch (error) {
            setError('An error occurred while executing the Python code.');
            setOutput('');
        }
    };

    const handleNext = () => {
        if (iterator + 1 < details.length) {
            setiterator(prevIterator => prevIterator + 1);
            setname(details[iterator + 1]?.Prob_name || '');
            setProbDescriptions(details[iterator + 1]?.Prob_description || '');

            if (iterator + 1 === details.length - 1) {
                setShowSubmit(true);
            }
        }

        if (output === details[iterator]?.output) {
            setresult(prevResult => prevResult + 'pass,');
        } else {
            setresult(prevResult => prevResult + 'fail,');
        }

        setOutput('');
        setError('');
        setCode('');
    };

    const handleSubmit = () => {
        if (output === details[iterator]?.output) {
            setresult(prevResult => prevResult + 'pass');
        } else {
            setresult(prevResult => prevResult + 'fail');
        }

        unlockPage();
    };

    const unlockPage = () => {
        window.removeEventListener('beforeunload', null);
        document.removeEventListener('visibilitychange', null);
        console.log(ID, sessionStorage.getItem('id'), result)
        const competition_id = ID;

        const user_id = sessionStorage.getItem('id');

        setresult(result => result.slice(0, -1));
        console.log(result)
        APIServices.insertResult(competition_id, user_id, result)
            .then((resp) => {
                console.log(resp);
                navigate('/result');
                
            })
            .catch((error) => {
                console.error('Error creating post:', error);
            });

    };

    return (
        <div className="container">
            <h1>Locked Page</h1>
            <p>This page cannot be closed or navigated away until unlocked.</p>

            <br />
            <center>
                <h1>{Prob_names}</h1>
                <h3>{Prob_descriptions}</h3>
                <div>
                    <div className="codeArea">
                        <textarea style={{ width: "60%", height: "200px" }} value={code} onChange={(e) => setCode(e.target.value)} />
                    </div>
                    <div className="outputArea">
                        {output && <textarea style={{ width: "47%", height: "150px" }} value={output} readOnly />}
                        {error && <textarea value={`Error: ${error}`} readOnly />}
                        <button onClick={handleRunPython}>Run Python</button>
                    </div>
                </div>
                <button onClick={handleNext}>Next</button>
                {showSubmit && <button onClick={handleSubmit}>Submit</button>}

            </center>
        </div>
    );
};

export default Test;
