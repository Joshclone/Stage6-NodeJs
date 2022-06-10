
const { postSchema } = require('../models/post');

async function approve(req, res, next) {
    const userID = req.decoded;    
    const postID = req.params.id; 
    const post = await postSchema.findById(postID, '');
        
    if (post._userID == userID) {
        next();
    } else {
        res.send("You are not allowed to access this route");
    }



};

module.exports = { approve };