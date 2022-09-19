import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { Card, CardContent, Grid,Button,Select,labelId,MenuItem } from "@material-ui/core";

const UpdateProduct = ()=>{
    const [name,setName] = useState('');
    const [price,setPrice] = useState('');
    const [category,setCategory] = useState('');
    const [qty,setQty] = useState('');
    const [size,setSize] = useState('');
    const [brand,setBrand] = useState('');
    const [error,setError] = useState(false);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        getProductDetails();
    },[])

    const getProductDetails = async ()=>{
        console.log(params);
        let result = await fetch(`http://ecommerce-panel.herokuapp.com/product/${params.id}`,{
            headers:{
                authorization: JSON.parse(localStorage.getItem('token'))
            }
        });
        result = await result.json();
        setName(result.name)
        setPrice(result.price)
        setCategory(result.category)
        setBrand(result.brand)
        setSize(result.size)
        setQty(result.qty)
    }

    const updateProduct = async ()=>{
        console.log('inside update')

        console.log(name,price,category,brand);

        // if(!name || !price || !brand || !category || !qty || !size)
        // {
        //     setError(true);
        //     return false;
        // }
        if(!(price>0))
        {
            setError(true);
            setPrice('');
            return false;
        }

        if(!(qty>0))
        {
            setError(true);
            setQty('');
            return false;
        }
        
        // const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch(`http://ecommerce-panel.herokuapp.com/product/${params.id}`,{
            method: 'put',
            body: JSON.stringify({name,price,category,brand,qty,size}),
            headers: {
                'Content-Type': 'application/json',
                authorization: JSON.parse(localStorage.getItem('token'))
            }
        });
        // result = await result.json();
        console.log(result);
        alert('product updated successfully')
        navigate('/products');
    }


    return(
        <>
        <Grid >
            <Card className="addproduct-grid">
                {/* <CardContent> */}
        <div className="product-form">
            <h1>Update Product</h1>
            <input type={'text'} placeholder='Enter product name' className="input-box" onChange={(e)=>{setName(e.target.value)}}/>
            {error && !name && <span className="invalid-input">Please Enter Valid Name</span>}
            <input type={'text'} placeholder='Enter product price' className="input-box" onChange={(e)=>{setPrice(e.target.value)}}/>
            {error && !price && <span className="invalid-input">Please Enter Valid Price</span>}
            {/* <input type={'text'} placeholder='Enter product category' className="input-box" onChange={(e)=>{setCategory(e.target.value)}}/> */}

            <input type={'number'} placeholder='Enter product quantity' className="input-box" onChange={(e)=>{setQty(e.target.value)}}/>
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
                                                {/* <option className='input-box' value="Kids">Kids</option> */}
                                            </select>
            {error && !category && <span className="invalid-input">Please Enter Valid Category</span>}
            
            <input type={'text'} placeholder='Enter product brand' className="input-box" onChange={(e)=>{setBrand(e.target.value)}}/>
            {/* <select value={category} className='input-box input-select-box' onChange={(event) => setCategory(event.target.value)}>
                                                <option className='input-box' value="">Select product category</option>
                                                <option className='input-box' value="Men">Men</option>
                                                <option className='input-box' value="Women">Women</option>
                                            </select> */}
            {error && !brand && <span className="invalid-input">Please Enter Valid Company</span>}
            <Button type="submit" className="btn" onClick={updateProduct} variant='contained' color='primary'>Update Product</Button>
        </div>
        {/* </CardContent> */}
        </Card>
        </Grid>
        </>
    )
}
export default UpdateProduct;