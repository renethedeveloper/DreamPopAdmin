
const mongoose = require('mongoose');

let connectionString = `mongodb+srv://Rene:${process.env.MONGO_PASS}@cluster0.zbldfqq.mongodb.net/DreamPop?retryWrites=true&w=majority`
console.log(connectionString);

mongoose.connect(connectionString, {
   
    
})
.then(() => {
    console.log('Connected to DATABASE');
})
.catch((error) => {
    console.error('Connection to DATABASE failed:', error);
});
