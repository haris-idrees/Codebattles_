// import React, { useEffect, useState } from 'react';
// import APIServices from '../APIServices';
// import { Link } from 'react-router-dom';


// function CreateCompetiton() {

//     const [problems, setProblems] = useState([]);

//     useEffect(() => {
//         APIServices.getAllProblems()
//             .then(problems => {
//                 setProblems(problems);
//             })
//             .catch(resp =>console.log(resp));
//     })
//     return (
//         <>
//             <div className='container'>
//                 <div>
//                     <div class="form-value">
//                         <form>
//                             <div>
//                                 <label>Name</label>
//                                 <input type='text' />
//                             </div>
//                             <div>
//                                 <label>Description</label>
//                                 <input type='text' />
//                             </div>
//                             <div>
//                                 <label>Image</label>
//                                 <input type='file' />
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//                 </div>

//                 <h1>Select Problems</h1>
//                 {problems.map(problem => (
//                     <p>
//                         {problem.Prob_description}
//                     </p>
//                 ))}
//                 <Link to='/createprob'>
//                     <button>Create Problem</button>
//                 </Link>
//             <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
//             <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
//         </>
//     )
// }

// export default CreateCompetiton


import React, { useState, useEffect } from 'react'
import { AiOutlineUserDelete, AiOutlineLock, AiOutlineFieldTime, AiFillContacts } from "react-icons/ai";
import { FaRegAddressBook } from "react-icons/fa";
import APIServices from '../APIServices';
import { useNavigate } from 'react-router-dom';

function Register(props) {

    const [name, setName] = useState('')
    const [Description, setDescription] = useState('')
    const [image, setImage] = useState()
    const [problems, setProblems] = useState([]);

    const navigate = useNavigate();

    APIServices.getAllProblems()
    .then(problems => {
        setProblems(problems);
    })
    .catch(error => {
        alert("Error in fetching problems");
    });


    return (
        <div className='signupHero'>
            <section>
                <div className='container'>
                    <div className='col-md-6'>
                        <div class="form-box">
                            <div class="form-value">
                                <form action="">
                                    <h2>Create Competition</h2>
                                    <div class="inputbox">
                                        <input type="text" required value={name} onChange={e => setName(e.target.value)} />
                                        <label for=""><AiOutlineUserDelete color="#adb5bd70" /> Name</label>
                                    </div>
                                    <div class="inputbox">
                                        <input type="email" required value={Description} onChange={e => setDescription(e.target.value)} />
                                        <label for=""><AiOutlineLock color="#adb5bd70" /> Description</label>
                                    </div>

                                    <div class="inputbox">
                                        <input type="file" required value={image} onChange={e => setImage(e.target.value)} />
                                        <br></br>
                                        <br />
                                        <br />
                                        <label for=""><AiFillContacts color="#adb5bd70" /> Image</label>
                                    </div>

                                    <center>
                                        <button >Create</button>
                                    </center>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6'>

                    </div>
                </div>
            </section>
            <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
            <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
        </div>
    )
}

export default Register