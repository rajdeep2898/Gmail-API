require("dotenv").config();

// required parameters to Authorize hte app
const client_id=process.env.CLIENT_ID;  // PROJECT CLIENT ID  		
const client_secret=process.env.CLIENT_SECRET;//PROJECT CLIENT SECRET 

const scope = "https://www.googleapis.com/auth/gmail.send"; // details of API that we want to use i.e send mail
const redirect_uri = "http://localhost:8080/api";          // the route thet the gmail API will redirect to
                                       
const response_type = "code";

exports.authorize = (req, res) => {
	var authURL = "https://accounts.google.com/o/oauth2/v2/auth?"+ 
	"client_id=" + client_id +
	"&scope=" + scope +
	"&redirect_uri=" + redirect_uri +
	"&response_type=" + response_type;

	res.redirect(authURL);
};