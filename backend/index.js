const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const jwtkey = 'ecomm';
require('./db/config');
const mongoose = require('mongoose');
const { User } = require('./db/model/user');
const { Product } = require('./db/model/product');
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

// const connectionString = `mongodb+srv://ankit:pEDcxXPuLsHY6NXh@cluster0.9qfdl.mongodb.net/EcommDashboardDB?retryWrites=true&w=majority`
// mongoose.connect(connectionString).then(()=>console.log('connected to database',(err)=>{
//     if(err)
//     {
//         console.log('error in connecting database')
//     }
// }))
// .catch(error=> console.log(error))

app.get('/checkLoggedIn', verifyToken, async (req, res) => {
    console.log('inside check')
    res.send(true);
    // const registered = await User.findOne({email:req.body.email,})
    // if(registered)
    // {
    //     res.send({error: 'email is already registered'})
    // }

})

app.post('/register', async (req, res) => {
    const registered = await User.findOne({ email: req.body.email })
    if (registered) {
        res.send({ error: 'email is already registered' })
    }
    else {
        const user = new User(req.body);
        let data = await user.save();
        data = data.toObject();
        delete data.password;
        jwt.sign({ data }, jwtkey, { expiresIn: '2h' }, (err, token) => {
            if (err) {
                res.send({ 'error': err })
            }
            res.send({
                data,
                auth: token
            });
        })
    }
})

app.post('/login', async (req, res) => {
    console.log(req.body);
    if (req.body.email && req.body.password) {
        let user = await User.findOne(req.body).select('-password');
        if (user) {
            jwt.sign({ user }, jwtkey, { expiresIn: '2h' }, (err, token) => {
                if (err) {
                    res.send('something went wrong')
                }
                res.send({ user, auth: token })
            })
        }
        else {
            res.send({ result: 'no user found' })
        }
    }
    else {
        res.send({ error: 'email or password is not entered' });
    }
})


app.post('/addproduct', verifyToken, async (req, res) => {
    let product = new Product(req.body);
    product = await product.save();
    res.send(product);
})


app.get('/products', verifyToken, async (req, res) => {
    let product = await Product.find({
        userId: req.headers['body']
    });
    if (product.length>0) {
        //console.log(product);
        res.send(product)
    }
    else {
        //console.log(product);
        res.send({error:'error'})
    }
})


app.delete('/product/:id', verifyToken, async (req, res) => {
    const result = await Product.deleteOne({ _id: req.params.id })
    res.send(result);
})

app.get('/product/:id', verifyToken, async (req, res) => {
    const result = await Product.findOne({ _id: req.params.id })
    if (result) {
        res.send(result)
    }
    else
        res.send({error:'error'})
})

app.put('/product/:id', verifyToken, async (req, res) => {
    let result = await Product.updateOne({ _id: req.params.id },
        { $set: req.body }
    ).then((err) => {
        if (err)
            console.log(err)
    })
    // result = await result.json();
    res.send(result)
})

app.get('/product/search/:key', verifyToken, async (req, res) => {
    let result = await Product.find({
        "$or": [
            { 
                name: { 
                    $regex: new RegExp('^' + req.params.key,'i')
            } 
            },
            {
                brand: { $regex: new RegExp('^' + req.params.key,'i')}
            },
            {
                category: {$regex: new RegExp('^' + req.params.key,'i')}
            },
            {
                price: {$regex: new RegExp('^' + req.params.key,'i')}
            },
            {
                qty: {$regex: new RegExp('^' + req.params.key,'i')}
            }
        ]
    })
    if (result){
        res.send(result)
    }
    else {
        res.send({ error: 'error' })
    }
});




function verifyToken(req, res, next) {
    let token = req.headers['authorization'];
    if (token) {
        token = token.split(' ')[0];
        // console.log('middleware called if', token)
        
        jwt.verify(token, jwtkey, (err, valid) => {
            if (err) {
                // console.log(err);

                // res.status(401).send({ result: 'Please provide valid token' })
                err={
                    name:"jwtError",
                    message:"tokenNotMatch"
                }
                res.send(err);
            }
            else {
                next();
            }
        })
    }
    else {
        console.log("402");

        res.status(403).send({ result: 'Please add token with header' })


    }
}

app.listen(PORT, () => {
    console.log('server has started');
})