const bcrypt = require("bcryptjs");
const auth = require("basic-auth");
const {User} = require("../models")

exports.authenticateUser = async(req,res,next)=>{
    let message 
    let credentials = auth(req);

    //check if credentials are present
    if(credentials){
        const user = await User.findOne({
            where:{emailAddress: credentials.name}})
        if(user){
            const authenticated = bcrypt.compareSync(credentials.pass, user.password);
            if(authenticated){
                req.currentUser = user
                console.log(`Welcome, ${user.firstName}`);
            }
            else{
                message ="Authentication Failed, try again."
            }
        }
        else{
            message ="Sorry, this user doesn't exist"
        }

    }
    else{
        message = "login reqired for this route"

    }

    if(message){
        console.warn(message);
        res.status(401).json({message:'Denied'})
    }
    else{
        next()
    }
}
