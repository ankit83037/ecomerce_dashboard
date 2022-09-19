import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { AppBar, Toolbar, Divider, Typography } from '@material-ui/core';

const Navbar = () => {
    const navigate = useNavigate('/');
    let auth = localStorage.getItem('user');
    const [val, setVal] = useState(true);
    let location = useLocation();

    const logout = () => {
        localStorage.clear();
        setVal(false)
        navigate('/signup');
    }
    auth = JSON.parse(auth)

    useEffect(() => {
        if (location.pathname == "/login" || location.pathname == "/signup" || location.pathname == "/") {
            setVal(false);
        }
        else {
            setVal(true);
        }
    });

    return (
        <>
            <AppBar position='sticky'>
                <Toolbar>
                    <Typography variant='h5'>Ecommerce Dashboard</Typography>
                </Toolbar>
                <Divider />
                <Toolbar>
                    <>
                        <div className="nav">
                            {
                                val ?
                                    <>
                                        <img className="logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL9BimbxSgl9SB4b3B6V8hSvpAPYmqjXZsUA&usqp=CAU" alt="logo" />
                                        <ul>
                                            <Link to="/home">Home</Link>
                                            <Link to='/products'>Products</Link>
                                            <Link to='/add'>Add Products</Link>
                                            <Link to='/update'>Update Products</Link>
                                            <Link to='/profile'>Profile</Link>
                                            <Link to='/login' onClick={logout}>Logout</Link>
                                        </ul>
                                    </>
                                    : <ul className="nav-right">
                                        <img className="logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL9BimbxSgl9SB4b3B6V8hSvpAPYmqjXZsUA&usqp=CAU" alt="logo" />
                                        <div className="nav-right-sign">
                                            <Link to='/signup'>Signup</Link>
                                            <Link to='/login'>Login</Link>
                                        </div>
                                    </ul>
                            }
                        </div>
                    </>
                </Toolbar>
            </AppBar>
        </>
    )
}
export default Navbar;