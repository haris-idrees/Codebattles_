import React, { useEffect, useState } from 'react';
import { CloudinaryImage } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import APIServices from '../APIServices';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ProfileContent.css';
import './ProfilePost.css';

function ProfileContent() {
    const [description, setDescription] = useState('');
    const [profile, setProfile] = useState(null);
    const [cover, setCover] = useState(null);
    const [fileVisible, setVisible] = useState(null);
    const [coverFileVisible, setCoverFileVisible] = useState(null);
    const [responseData, setResponseData] = useState('');
    const [coverResponseData, setCoverResponseData] = useState('');
    const [profile_picture, setProfile_picture] = useState();
    const navigate = useNavigate();
    const loggedIn_id = sessionStorage.getItem('id');
    const [posts, setPosts] = useState([]);
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

    useEffect(() => {
        const fetchProfileDetails = () => {
            const userEmail = sessionStorage.getItem('email');

            axios
                .get('http://127.0.0.1:8000/getuserdetails/', {
                    params: {
                        email: userEmail,
                    },
                })
                .then(res => {
                    const data = res.data.user_details;
                    console.log('Data fetched from API:', data);
                    setDetails(data);

                    setCover(new CloudinaryImage(data.cover_photo, { cloudName: 'drvo4uxiv' }));
                    setProfile(new CloudinaryImage(data.profile_picture, { cloudName: 'drvo4uxiv' }));
                    setVisible(false);
                    setCoverFileVisible(false);
                })
                .catch(err => {
                    console.log('Error fetching data from API:', err);
                });
        };

        fetchProfileDetails();
    }, []);

    useEffect(() => {
        APIServices.getUserPosts(loggedIn_id)
            .then(users => {
                setPosts(users); // Update the state with the fetched posts
            })
            .then(() => console.log('Posts fetched'))
            .catch(error => {
                alert('Error in data fetching');
            });
    }, []);

    const [details, setDetails] = useState([]);

    useEffect(() => {
        const userEmail = sessionStorage.getItem('email');

        axios
            .get('http://127.0.0.1:8000/getuserdetails/', {
                params: {
                    email: userEmail,
                },
            })
            .then(res => {
                const data = res.data.user_details;
                console.log('Data fetched from API:', data);
                setDetails(data);
                setDescription(data.description);
            })
            .catch(err => {
                console.log('Error fetching data from API:', err);
            });
    }, []);

    

   
    function submitImage(e) {
        const data = new FormData();
        var img = e.target.files[0];
        var blob = img.slice(0, img.size);

        var newFile = new File([blob], `${details.id}ProfilePicture`, { type: `${img.type}` });
        data.append('file', newFile);
        data.append('upload_preset', 'CodeBattles');
        data.append('cloud_name', 'drvo4uxiv');

        fetch('https://api.cloudinary.com/v1_1/drvo4uxiv/upload', {
            method: 'post',
            body: data,
        })
            .then(res => res.json())
            .then(response_data => {
                console.log(response_data['public_id']);
                alert('Profile Picture Updated!');
                setResponseData(response_data);
                const user_id = details.id;
                APIServices.UpdateUser(user_id, {
                    name: details.name,
                    email: details.email,
                    password: details.password,
                    country: details.country,
                    profile_picture: response_data['public_id'],
                })
                    .then(resp => {
                        console.log(resp);
                        navigate('/profile');
                        window.location.reload(); // Navigate to the profile page
                    })
                    .catch(error => console.log(error));
            })
            .catch(error => console.log(error));
    }

    function submitCoverImage(e) {
        const data = new FormData();
        var img = e.target.files[0];
        var blob = img.slice(0, img.size);
        var newFile = new File([blob], `${details.id}CoverPicture`, { type: `${img.type}` });
        data.append('file', newFile);
        data.append('upload_preset', 'CodeBattles');
        data.append('cloud_name', 'drvo4uxiv');

        fetch('https://api.cloudinary.com/v1_1/drvo4uxiv/upload', {
            method: 'post',
            body: data,
        })
            .then(res => res.json())
            .then(response_data => {
                console.log(response_data);
                alert('Cover Photo Updated!');
                setCoverResponseData(response_data);
                const user_id = details.id;
                APIServices.UpdateUser(user_id, {
                    name: details.name,
                    email: details.email,
                    password: details.password,
                    country: details.country,
                    cover_photo: response_data['public_id'],
                })
                    .then(resp => {
                        console.log(resp);
                        navigate('/profile'); // Navigate to the profile page
                        window.location.reload();
                    })
                    .catch(error => console.log(error));
            })
            .catch(err => console.log(err));
    }

    return (
        <body>
            <div className="header__wrapper">
                <header>
                    <div className="container">
                        <AdvancedImage cldImg={cover} id="cover-photo" />

                        {coverFileVisible ? (
                            <input id="cover_file" type="file" onChange={e => submitCoverImage(e)} />
                        ) : (
                            <></>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="update_cover_button"
                        onClick={() => {
                            setCoverFileVisible(true);
                        }}
                    >
                        Update Cover
                    </button>
                    <br />
                    <br />
                </header>
                <br></br>
                <br></br>
                <div className="cols__container">
                    <div className="left__col">
                        <div className="img__container">
                            <AdvancedImage cldImg={profile} />
                            <span></span>
                        </div>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <p>{details.name}</p>
                        <br />
                        {fileVisible ? (
                            <div>
                                <label id="profile_label">Choose Profile</label>
                                <input type="file" id="profile_picture_input" onChange={e => submitImage(e)} />
                                <br />
                                <br />
                            </div>
                        ) : (
                            <></>
                        )}
                        <button
                            id="update_profile_button"
                            onClick={() => {
                                setVisible(true);
                            }}
                        >
                            Update Picture
                        </button>
                        <br />
                        <br />
                        <ul className="about">
                            <li>
                                <span>4,073</span>Friends
                            </li>
                            <li>
                                <span>322</span>Posts
                            </li>
                            <li>
                                <span>200,543</span>Competitions
                            </li>
                        </ul>

                        <div className="content">
                            <p>
                                
                                {details.description}
                                <table className="table table-responsive">
                                    <thead className="table-success">
                                        <tr>
                                            <th>Competition Name</th>
                                            <th>Pass Percentage</th>
                                            <th>Fail Percentage</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {result.length > 0 ? (
                                            result.map((user, index) => (
                                                <tr key={index}>
                                                    <td>{user.competition_name}</td>
                                                    <td>{user.passPercentage}%</td>
                                                    <td>{100 - user.passPercentage}%</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="3">No results available</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </p>
                            
                        </div>
                    </div>
                    <div className="right__col">
                        <nav>
                            <ul>
                                <li>
                                    <a href="">Feed</a>
                                </li>
                                <li>
                                    <a href="">Gallery</a>
                                </li>
                                <li>
                                    <a href="">Competitions</a>
                                </li>
                                <li>
                                    <a href="">About</a>
                                </li>
                            </ul>
                            <br />
                            <br />
                            <br />
                            <button onClick={() => navigate(`/updateprofile/${details.email}`)}>Update Profile</button>
                        </nav>
                        <div className="post_css">
                            {/* <ProfilePost /><br />
                                <ProfilePost /><br />
                                <ProfilePost /><br /> */}

                            {posts.map(post => (
                                <div key={post.id}>
                                    <div className="f-card">
                                        <div className="header">
                                            <div className="options">
                                                <i className="fa fa-chevron-down"></i>
                                            </div>
                                            <AdvancedImage cldImg={profile} class="co-logo" />
                                            <div className="co-name">
                                                <a href="#">{details.name}</a>
                                            </div>
                                            <div className="time">
                                                <a href="#">2hrs</a> · <i className="fa fa-globe"></i>
                                            </div>
                                        </div>
                                        <div className="content">
                                            <p>
                                                {post.post_text}
                                            </p>
                                        </div>

                                        <div className="reference">
                                            <AdvancedImage cldImg={new CloudinaryImage(post.post_image, { cloudName: 'drvo4uxiv' })} className="reference-thumb" />
                                        </div>
                                        {/* <div className="social">
                                                <div className="social-content"></div>
                                                <div className="social-buttons">
                                                    <span>
                                                        <i className="fa fa-thumbs-up"></i>Like
                                                    </span>
                                                    <span>
                                                        <i className="fa fa-thumbs-down"></i>Dislike
                                                    </span>
                                                </div>
                                            </div> */}
                                    </div>
                                </div>
                            ))}            </div>
                    </div>
                </div>
            </div>
        </body>
    );
}

export default ProfileContent;
