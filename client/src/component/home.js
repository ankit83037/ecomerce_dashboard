import React, { useEffect, useState } from 'react';
import { Chart } from 'chart.js/auto'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import { Grid, CardContent, Card, Typography } from '@material-ui/core';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { NetworkCellOutlined } from '@material-ui/icons';

const Home = () => {

    const [products, setProducts] = useState([]);
    const [p, setp] = useState({});
    let totalPrice = 0;
    let menPrice = 0;
    let womenPrice = 0;
    let kidPrice = 0;
    let menSize = 0;
    let menQty = 0, womenQty = 0, kidQty;
    let mSize = 0, lSize = 0, sSize = 0, xlSize = 0;
    let mwSize = 0, lwSize = 0, swSize = 0, xlwSize = 0;
    useEffect(() => {
        getProducts();
    }, []);
    function checkLoggedIn() {
        axios.get('http://ecommerce-panel.herokuapp.com/checkLoggedIn', {
            headers: {
                authorization: JSON.parse(localStorage.getItem('token'))
            }
        }).then((succ, err) => {
            // console.log(succ.data)
            setp(succ.data);

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


    const getProducts = async () => {
        const auth = JSON.parse(localStorage.getItem('user'))
        const key = auth._id
        let result = await fetch(`http://ecommerce-panel.herokuapp.com/products`, {
            headers: {
                body: key,
                authorization: JSON.parse(localStorage.getItem('token'))
            }
        });
        result = await result.json();
        // setProducts(result)
        console.log(result.error =='error')
        // if(result.error=='error') {
            setProducts(result);
            console.log(products)
        // }else {
        // setProducts(result);
        // }
    }

    const arr = []
    const brand_arr = []

    const arr1 = []
    const brand_arr1 = []

    if (products.length >0) {
        for (let item of products) {
            totalPrice = totalPrice + parseInt(item.price)
            if (item.category == 'Men') {
                arr.push(item)
                brand_arr.push(item.brand)
                menPrice += parseInt(item.price);
                menQty += parseInt(item.qty);
                if (item.size == 'M') { mSize += parseInt(item.qty) }

                else if (item.size == 'L') { lSize += parseInt(item.qty) }

                else if (item.size == 'XL') { xlSize += parseInt(item.qty) }

                else { sSize += parseInt(item.qty) }
            }
            else {
                womenPrice += parseInt(item.price)
                womenQty += parseInt(item.qty)
                arr1.push(item)
                brand_arr1.push(item.brand)
                if (item.size == 'M') { mwSize += parseInt(item.qty) }

                else if (item.size == 'L') { lwSize += parseInt(item.qty) }

                else if (item.size == 'XL') { xlwSize += parseInt(item.qty) }

                else { swSize += parseInt(item.qty) }
            }
        }
    }
    // else {
        // console.log('if')
        // return;
    // }

    let uniqueItems = [...new Set(brand_arr)]
    // console.log(uniqueItems)
    const calc_brand = []
    for (let i = 0; i < uniqueItems.length; i++) {
        calc_brand[i] = 0
        for (let item of arr) {
            if (uniqueItems[i] == item.brand) {
                calc_brand[i] += parseInt(item.qty)
                // console.log('cal'+calc_brand)
            }
        }
    }

    let uniqueItems1 = [...new Set(brand_arr1)]
    // console.log('uniq'+uniqueItems1)
    const calc_brand1 = []
    for (let i = 0; i < uniqueItems1.length; i++) {
        calc_brand1[i] = 0
        for (let item of arr1) {
            if (uniqueItems1[i] == item.brand) {
                calc_brand1[i] += parseInt(item.qty)
                console.log('cal' + calc_brand1[i])
            }
        }
    }
    
    const data = {
        labels: ['men', 'women', 'kid'],
        datasets: [{
            label: 'Product Quantity',
            data: [menQty, womenQty, kidQty],
            backgroundColor: 'orange',
            hoverBackgroundColor: 'green',
        }]
    }

    const data1 = {
        labels: ['M-Size', 'L-size', 'XL-size', 'S-size'],
        datasets: [{
            label: 'No. of Men t-shirt',
            data: [mSize, lSize, xlSize, sSize],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(10, 200, 85)'
            ],
            hoverOffset: 4,
            // hoverBackgroundColor: 'green',
        }]
    }

    const data2 = {
        labels: ['Total Men Product Price', 'Total Women Product Price'],
        datasets: [{
            label: 'Product Price',
            data: [menPrice, womenPrice, kidPrice],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(10, 200, 85)'
            ],
            hoverOffset: 4,
            // hoverBackgroundColor: 'green',
        }]
    }

    const data3 = {
        labels: ['M-Size', 'L-size', 'XL-size', 'S-size'],
        datasets: [{
            label: 'No. of Women clothes',
            data: [mwSize, lwSize, xlwSize, swSize],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(10, 200, 85)'
            ],
            hoverOffset: 4,
            // hoverBackgroundColor: 'green',
        }]
    }


    const data4 = {
        labels: uniqueItems,
        datasets: [{
            label: 'No. of Male Clothes Brand',
            data: calc_brand,
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(10, 200, 85)'
            ],
            hoverOffset: 4,
            // hoverBackgroundColor: 'green',
        }]
    }

    const data5 = {
        labels: uniqueItems1,
        datasets: [{
            label: 'No. of Female Clothes Brand',
            data: calc_brand1,
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(10, 200, 85)'
            ],
            hoverOffset: 4,
            // hoverBackgroundColor: 'green',
        }]
    }


console.log(products);
    return (
        <>
            {products && products.length > 0 ?
                    < Grid >
                        <Grid className='product-grid graph'>
                            <CardContent>
                                <Card>
                                    {/* <h1>Store Item Analytics</h1> */}
                                    <h2>Total amount of item in the stock is Rs. {totalPrice} /-</h2>
                                    <div className='first-div'>
                                        <div className='div1'>
                                            <Bar data={data1} />
                                        </div >
                                        <div className='div2'>
                                            <Bar data={data3} />
                                        </div>
                                    </div>
                                    <div className='second-div'>
                                        <div className='div3'>
                                            <Doughnut data={data4} />
                                        </div >
                                        <div className='div4'>
                                            <Doughnut data={data5} />
                                        </div>
                                    </div>
                                    <div>
                                        <div className='div5'>
                                            <Line data={data} />
                                        </div>
                                        <div className='div4'>
                                            <Doughnut data={data2} />
                                        </div>
                                    </div>
                                </Card>
                            </CardContent>
                        </Grid>
                    </Grid >

                    :
                    <Grid>
                        <h1 style={{marginTop:'10%',textAlign:'center'}}>Please add some products</h1>
                    </Grid>
            }
        </>
    )

}

export default Home;