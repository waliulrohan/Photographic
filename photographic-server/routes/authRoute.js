const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

const {signUp,login} = require('../controllers/authControllers')

//sign up user 
router.post('/signUp',signUp)


// login user
router.post("/login",login)


module.exports = router;