import { Card, CardContent, Grid, Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [qty, setQty] = useState('');
    const [size, setSize] = useState('');
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [error, setError] = useState(false);
    const [p, setp] = useState({});

    function checkLoggedIn() {
        // console.log('addproduct')
        axios.get('http://ecommerce-panel.herokuapp.com/checkLoggedIn', {
            headers: {
                authorization: JSON.parse(localStorage.getItem('token'))
            }
        }).then((succ, err) => {
            setp(succ.data);
        }).catch((error) => {
            if (error) {
                // console.log(error)
            }
        })
    }
    useEffect(() => {
        checkLoggedIn();
    })

    if (p.message == "tokenNotMatch") {
        return <Navigate to='/login' />
    }

    const submitProduct = async () => {


        if (!name || !price || !brand || !category || !qty || !size) {
            setError(true);
            return false;
        }
        if (!(price > 0)) {
            setError(true);
            setPrice('');
            return false;
        }

        if (!(qty > 0)) {
            setError(true);
            setQty('');
            return false;
        }
        console.log(name, price, category, brand);
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch('http://ecommerce-panel.herokuapp.com/addproduct', {
            method: 'post',
            body: JSON.stringify({ name, price, qty, size, category, brand, userId }),
            headers: {
                'Content-Type': 'application/json',
                authorization: JSON.parse(localStorage.getItem('token'))
            }
        });
        result = await result.json();
        // console.log(result);
        if (result) {
            alert('product added successfully')
        }
    }


    return (
        <>
            <Grid >
                <Card className="addproduct-grid">
                    <div className="product-form">
                        <h1>Add Product</h1>
                        <input type={'text'} placeholder='Enter product name' className="input-box" onChange={(e) => { setName(e.target.value) }} />
                        {error && !name && <span className="invalid-input">Please Enter Valid Name</span>}
                        <input type={'number'} placeholder='Enter product price' className="input-box" onChange={(e) => { setPrice(e.target.value) }} />
                        {error && !price && <span className="invalid-input">Please Enter Valid Price</span>}
                        <input type={'number'} placeholder='Enter product quantity' className="input-box" onChange={(e) => { setQty(e.target.value) }} />
                        {error && !price && <span className="invalid-input">Please Enter Valid Price</span>}
                        <select value={size} className='input-box input-select-box' onChange={(event) => setSize(event.target.value)}>
                            <option className='input-box' value="">Select product size</option>
                            <option className='input-box' value="S">S</option>
                            <option className='input-box' value="M">M</option>
                            <option className='input-box' value="L">L</option>
                            <option className='input-box' value="XL">XL</option>
                        </select>
                        {error && !category && <span className="invalid-input">Please Select Valid Category</span>}

                        <select value={category} className='input-box input-select-box' onChange={(event) => setCategory(event.target.value)}>
                            <option className='input-box' value="">Select product category</option>
                            <option className='input-box' value="Men">Men</option>
                            <option className='input-box' value="Women">Women</option>
                        </select>
                        {error && !category && <span className="invalid-input">Please Select Valid Category</span>}
                        <input type={'text'} placeholder='Enter product Brand' className="input-box" onChange={(e) => { setBrand(e.target.value) }} />
                        {error && !brand && <span className="invalid-input">Please Enter Valid Company</span>}
                        <Button type="submit" className="btn" onClick={submitProduct} variant='contained' color='primary'>Add Product</Button>
                    </div>
                </Card>
            </Grid>
        </>
    )
}
export default AddProduct;