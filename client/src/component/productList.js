import React, { useEffect, useState } from "react";
import { Link, Navigate } from 'react-router-dom';
import { Button, Card, CardContent, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';

const ProductList = () => {
    const [products, setProducts] = useState({});
    const men = ['men tshirt.jpeg', 'men tshirt1.jpg', 'men tshirt2.jpg', 'men tshirt3.jpeg', 'men tshirt4.jpeg']
    const women = ['women.jpg', 'women1.jpeg']

    useEffect(() => {
        getProducts();
    }, []);

    const imageIdentity = (e, key) => {
        if (e == 'Men') {
            let str = `../images/${men[key % men.length]}`
            // console.log(str)
            return str
        }
        if (e == 'Women') {
            let str = `../images/${women[key % women.length]}`
            // console.log(str)
            return str
        }
    }

    const getProducts = async () => {
        const auth = JSON.parse(localStorage.getItem('user'))
        const key = auth._id
        let result = await fetch(`http://ecommerce-panel.herokuapp.com/products`, {
            // body:{_id: JSON.parse(localStorage.getItem('user')._id)},
            headers: {
                body: key,
                authorization: JSON.parse(localStorage.getItem('token'))
            }
        });

        result = await result.json();
        // console.log(result);
        setProducts(result);
    }

    // console.log('products', products);

    const deleteProduct = async (id) => {
        if (window.confirm("Are you sure want to delete it?")) {
            let result = await fetch(`http://ecommerce-panel.herokuapp.com/product/${id}`, {
                method: 'Delete',
                headers: {
                    authorization: JSON.parse(localStorage.getItem('token'))
                }
            });
            result = await result.json()
            if (result) {
                alert('product deleted successfully');
                getProducts();
            }
        }
        else {
            return;
        }
    }


    const handleSearch = async (event) => {
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://ecommerce-panel.herokuapp.com/product/search/${key}`, {
                headers: {
                    authorization: JSON.parse(localStorage.getItem('token'))
                }
            })
            result = await result.json()
            // console.log(result);

            if (result) {
                setProducts(result)
            }
        }
        else {
            getProducts();
        }
    }


    if (products.message =="tokenNotMatch") {
        return <Navigate to='/login' />
    }


    return (
        <>
            <div className="product-list">
                <h1>Product List</h1>
                <input type={'search'} placeholder='search product' className="search-box"
            onChange={e =>handleSearch(e)}/>
            </div>
            {products.length > 0 ?
                <Grid className='product-grid'>   
                    <Grid>
                        <CardContent>
                            <Card>
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell><strong>Product Image</strong></TableCell>
                                                <TableCell><strong>Name</strong></TableCell>
                                                <TableCell><strong>Category</strong></TableCell>
                                                <TableCell><strong>Brand</strong></TableCell>
                                                <TableCell><strong>Price</strong></TableCell>
                                                <TableCell><strong>Size</strong></TableCell>
                                                <TableCell><strong>Qty.</strong></TableCell>
                                                <TableCell><strong>Update</strong></TableCell>
                                                <TableCell><strong>Delete</strong></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {products.map((row, key) => (
                                                // {console.log(key)},
                                                <TableRow key={row._id}>
                                                    <TableCell><img src={imageIdentity(row.category, key)} width='100px' /></TableCell>
                                                    <TableCell>{row.name}</TableCell>
                                                    <TableCell>{row.category}</TableCell>
                                                    <TableCell>{row.brand}</TableCell>
                                                    <TableCell>{row.price}</TableCell>
                                                    <TableCell>{row.size}</TableCell>
                                                    <TableCell>{row.qty}</TableCell>
                                                    <TableCell><Button type='submit'><Link to={`/update/${row._id}`} className='edit'><Edit /></Link></Button></TableCell>
                                                    <TableCell><Button type='submit' onClick={() => deleteProduct(row._id)}><Delete /></Button></TableCell>
                                                </TableRow>
                                            ))
                                            }

                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Card>
                        </CardContent>
                    </Grid>
                </Grid>
                : <h2 className="product-found">Products not found !!</h2>
            }
        </>
    )
}

export default ProductList;