const mongoose = require('mongoose');

const connectionString = `mongodb+srv://ankit:pEDcxXPuLsHY6NXh@cluster0.9qfdl.mongodb.net/EcommDashboardDB?retryWrites=true&w=majority`
mongoose.connect(connectionString).then(()=>console.log('connected to database',(err)=>{
    if(err)
    {
        console.log('error in connecting database')
    }
})).catch((error)=>{
    console.log(error)
})
 
// module.exports = db; 