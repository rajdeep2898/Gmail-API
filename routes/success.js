const express = require("express");
const router = express.Router();

const {success} = require("../controllers/success");

//Routs
//Create
//GET
router.get( "/",success);
module.exports = router;
