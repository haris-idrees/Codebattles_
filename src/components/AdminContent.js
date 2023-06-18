import React, { useEffect, useState } from 'react';
import APIServices from '../APIServices';
import { useNavigate,Link } from 'react-router-dom';


function AdminContent() {
    const [users, setUsers] = useState([]);
    const [competition, setCompetiotns] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        APIServices.getAllUsers()
            .then(users => {
                setUsers(users);
            })
            .catch(error => {
                alert("Error in fetching users");
            });
        APIServices.getAllCompetitions()
            .then(competition => {
                setCompetiotns(competition);
            })
            .catch(error => {
                alert("Error in fetching competitions");
            });

    }, []);

    return (

        <div className="container">
            <h1>Competitons</h1>
            <table className='table table-responsive'>
                <thead className='table-success'>
                    <tr>
                        <th>Name</th>
                        <th>Problems</th>
                    </tr>
                </thead>
                <tbody>
                    {competition.map(competition => (
                        <tr>
                            <td>{competition.name}</td>
                            <td>{competition.problem_list}</td>
                        </tr>
                    ))}
                </tbody>

            </table>
            <Link to='/createcomp'>
                <button>Create New</button>
            </Link>
            <h1>Users</h1>
            <table className='table table-hover table-responsive'>
                <thead className='table-success'>
                    <tr className="primary">
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Contact</th>
                        <th>User Type</th>
                        <th>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.age}</td>
                            <td>{user.contact}</td>
                            <td>{user.user_type}</td>
                            <td>
                                <td><button onClick={() => navigate(`/updateprofile/${user.email}`)}>Update</button></td>
                                <button>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default AdminContent
