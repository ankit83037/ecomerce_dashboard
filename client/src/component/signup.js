import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Grid,Button } from "@material-ui/core";

const Signup = ()=>{
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState(false);
    const [reEmail,setReEmail] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        // if(auth)
        // {
        //     navigate('/');
        // }
    },[]);

    function validate(){
        if(!name || !email || !password)
        {
            setError(true);
            return false;
        }
        else{
            if(!/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*$/.test(email))
            {
                setError(true)
                setEmail('');
                setReEmail('Please Enter Valid Email')
                return false;
            }

            if(!/^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$/.test(password))
            {
                setError(true)
                setPassword('')
                return false;
            }
            return true
        }
    }

    const submit= async()=>{
        // console.log(name,email,password);
        // console.log(validate());
        if(validate())
        {
        const result = await fetch('http://ecommerce-panel.herokuapp.com/register',{
            method: 'post',
            body: JSON.stringify({name,email,password}),
            headers: {
                'Content-Type' : 'application/json'
            },
        });
        const data = await result.json();
        // console.log(data);
        if(data.error == 'email is already registered')
        {
            // alert('already registered')
            setError(true)
            setEmail('')
            setReEmail('Email is already registered')
        }
        else
        {
            localStorage.setItem('user',JSON.stringify(data.data))
            localStorage.setItem('user',JSON.stringify(data.auth))
            navigate('/home');
        }
      }
    }

    return(
        <>
        <Grid >
            <Card className="login-grid">
                <CardContent>
        <div className="register-form">
            <h1>Register</h1>
            <input className="input-box" type="text" required placeholder='Enter Name' value={name} onChange={(e)=>setName(e.target.value)}/>
            {error && !name && <span className="invalid-input">Please Enter Valid Name</span>}
            <input className="input-box" type="email" required placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            {error && !email && <span className="invalid-input">{reEmail}</span>}
            <input className="input-box" type="password" required placeholder='Enter Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            {error && !password && <span className="invalid-input">Please Enter Valid Password</span>}
            <Button className="signup-btn" type= "button" value="Signup" onClick={submit} variant='contained' color='primary'>Signup</Button>
        </div>
        </CardContent>
        </Card>
        </Grid>
        </>
    )

}
export default Signup;