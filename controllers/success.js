const https = require('https');
const querystring = require('querystring');
require("dotenv").config();


// const client_id="110434763565-kduekrrrp81actjtabva8coq9vdv63bf.apps.googleusercontent.com";  // PROJECT CLIENT ID  	
// const client_secret = "7qe2OwqyljCR4xT1CtB7fCVA";//PROJECT CLIENT SECRET 


const client_id=process.env.CLIENT_ID;  // PROJECT CLIENT ID  		
const client_secret = process.env.CLIENT_SECRET;//PROJECT CLIENT SECRET 

const scope = "https://www.googleapis.com/auth/gmail.send";
const redirect_uri="http://localhost:8080/api";                                                
const response_type = "code";

var authorization_code="";
var access_token = "";
const fs = require('fs');


var options = {
	host:'oauth2.googleapis.com',
	port:443,
	path:'/token',
	method:'POST',
	headers:{
		'Content-Type':'application/x-www-form-urlencoded'
	}
}
var post_req =https.request(options, function(res){
      res.setEncoding('utf8');
      res.on('data', function(chunk){
      	  fs.writeFileSync('token.json',chunk);  //storing access token in token.js file
      });
  });

exports.success = (req, res) => {
	if(req.query.error=="access_denied"){return res.send("Access denied by the user");}
	authorization_code=req.query.code;
	if(authorization_code!=""){
		var post_data=querystring.stringify({
	      "client_id":client_id,
	      "client_secret":client_secret,
	      "code":authorization_code,
	      "grant_type":"authorization_code",
	      "redirect_uri":redirect_uri
		});
		post_req.write(post_data);    // to get access token
		post_req.end();
		}
	 res.send("Authorisation successful")
};