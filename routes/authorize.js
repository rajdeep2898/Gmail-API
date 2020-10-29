const express = require("express");
const router = express.Router();

// Import authorize function
const { authorize } = require("../controllers/authorize");

//Routes
//Create
// GET
router.get("/authorize", authorize);


module.exports = router;
