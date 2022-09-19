import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Grid,Button } from "@material-ui/core";

const Login = ()=>{
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        // if(auth){
        //     navigate('/');
        // }
    },[]);

    const handleLogin = async ()=>{
        // console.log(email,password);
        let result = await fetch('http://ecommerce-panel.herokuapp.com/login',{
            method: 'post',
            body: JSON.stringify({email,password}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        // console.log(result)
        if(result.auth)
        {
            localStorage.setItem('user',JSON.stringify(result.user));
            localStorage.setItem('token',JSON.stringify(result.auth));
            navigate('/home');
        }
        else{
            alert('wrong email or password')
        }
    }
    return(
        <>
        <Grid >
            <Card className="login-grid">
                <CardContent>
        <div className="register-form">
        <h1>Login</h1>
        <input type='text' placeholder='Enter Email' className="input-box" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input type='password' placeholder='Enter Password' className="input-box" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <Button type='submit' variant='contained' color='primary' className="signup-btn" onClick={handleLogin}>Login</Button>
        </div>
        </CardContent>
        </Card>
        </Grid>
        </>
    )
}
export default Login;