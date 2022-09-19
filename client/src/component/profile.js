import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom';

const Profile = () => {
    const [val, setVal] = useState(true);
    const [p, steP] = useState({});
    let auth = localStorage.getItem('user')
    auth = JSON.parse(auth);

    function checkLoggedIn() {
        // console.log('profile')
        axios.get('http://ecommerce-panel.herokuapp.com/checkLoggedIn', {
            headers: {
                authorization: JSON.parse(localStorage.getItem('token'))
            }
        }).then((succ, err) => {
            // console.log(succ.data)
            steP(succ.data);

        }).catch((error) => {
            if (error) {
                console.log(error)
            }
        })
    }

    useEffect(() => {
        checkLoggedIn();
    })

    if (p.message == "tokenNotMatch") {
        return <Navigate to='/login' />
    }

    return (
        <>
            {val
                ?
                <h1 className='profile-name'>Hi! {auth.name}</h1>
                : <><h1>error :(</h1></>
            }
        </>
    )
}

export default Profile;