//loading modules
const express = require('express');
require("dotenv").config();


//creating our server
const server=express();

//middleware
server.use(express.json()); // to recognize the incoming request object as JSON object

//Routes
const emailRoutes = require("./routes/email");
const successRoutes = require("./routes/success");
const authorizeRoutes = require("./routes/authorize");

// Application Routes
server.use('/api', authorizeRoutes);
server.use('/api', successRoutes);
server.use('/api', emailRoutes);

// console.log(process.env.CLIENT_ID, process.env.CLIENT_SECRET);

server.listen(8080,()=>{
	console.log('app listening to port '+8080);
})