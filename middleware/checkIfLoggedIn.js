const jwt = require('jsonwebtoken');

const { userSchema } = require('../models/users');

//checks if the token exist, extracts it
function check(req, res, next) {
    if (req.headers.authorization.split(" ")[0] == "Bearer") {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.jwtkey, function (err, payload) {
            if (err) console.log(err);
            //find the person username 
            userSchema.findOne({ username: payload.username }, 'username', function (err, user) {
                if (err) console.log(err);
              
                if (!user) {
                    res.send("User does not exist")
                } else {
                    req.decoded = user._id;
                    next();
                }
            });
          
        });
       
    } else {
        res.send("You are not authorized")
    }
}



    module.exports = { check };