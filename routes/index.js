
const { register, login } = require('../controllers/auth')

const express = require("express");
const router = express.Router();
const { check } = require('../middleware/checkIfLoggedIn');
const { postSchema } = require('../models/post');
const {  approve } = require('../middleware/authorize');



//routes for users to register
router.post('/register', register);

//routes for users to login
router.post('/login', login);




  //A general route -- Anyone has access to this route
  router.get('/general', function (req, res) {
    res.send("Anyone has access to this route");
});


  //This route -- is restricted for only logged in users 
router.get('/restricted', check, function (req, res) {
  
    res.send("This route is restricted for   only logged in users");
});


//in this route you make a post on the dashboard page
router.post('/dashboard', check, async function (req, res) {
  const { post } = req.body;
  const newPost = new postSchema({
    userID: req.decoded,
    post
  });

  const newPreviouspost = await newPost.save();
  res.json({
    successful: true,
    newPost:newPreviouspost
  })
});

//only people logged into the dashboard  can delete a post
//checks if the person is authorized to delete
router.delete('/post/:id', check, approve, function (req, res) {
  const postID = req.params.id;
  res.send("You are authorized");
});


module.exports = router;
