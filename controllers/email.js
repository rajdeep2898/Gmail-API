const { check, validationResult } = require("express-validator");
const fs = require('fs');
var access_token = "";
const https = require('https');



exports.email = (req, res) => {
const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
	console.log(req.body.to);
	console.log(req.body.subject);

	fs.readFile('token.json', function read(err, data) {
      if (err) {
        throw err;
       }
    access_token=JSON.parse(data).access_token;
	});
	setTimeout(()=>{
	var mail = new Buffer.from(
	     "To:"+req.body.to+"\n"+
	     "Subject:"+req.body.subject+"\n\n"+

		 req.body.message
	).toString("base64").replace(/\+/g,'-').replace(/\//g,'_')
	var post2 = {
	hostname:'www.googleapis.com',
	port:'443',
	path:'/gmail/v1/users/me/messages/send',
	method:'POST',
	headers:{
		"Authorization" : "Bearer "+ access_token,
		"Content-Type" : "application/json"
	}
	}
	var post_req1 = https.request(post2,function(res){
		res.setEncoding('utf8');
		res.on('data',function(chunk){
			console.log("response_type   "+chunk);
		})
	})
	post_req1.write(JSON.stringify({"raw":mail}))
	post_req1.end()
	res.send("successfully sent mail to "+req.body.to)
	},3000);
};