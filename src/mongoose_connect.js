// This file is run once to connect to hosted MongoDB
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const uri = "mongodb+srv://nimish:samplepassword@cluster0.h5yh2.mongodb.net/assignmentdata?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error',console.error.bind("error creating db"));

db.once('open',function(err){
    if(err){
        console.error('err opening db');
        return;
    }
    console.debug("database setup succesful");
});

module.exports = db;