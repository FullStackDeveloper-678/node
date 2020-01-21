var mongoose = require('mongoose');

module.exports = () => {
    mongoose.set('useUnifiedTopology', true);
    // const url = process.env.MONGO_URI;
    return mongoose.connect('mongodb://localhost/ReatApi',{useNewUrlParser: true})  
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));
};

