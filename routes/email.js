const express = require("express");
const router = express.Router();

//Importing email function
const { email } = require("../controllers/email");

// validation
const { check, validationResult } = require("express-validator");

//Routes
//Create
//POST
router.post(
  "/email",
  [
    // validation for all request variables
    check("subject", "Subject must be at least 5 chars long").isLength({ min: 5 }), 
    check("to", "email is required").isEmail(),
    check("message", "message must be at least 20 chars long").isLength({
      min: 20,
    }),
  ],
  email
);
module.exports = router;