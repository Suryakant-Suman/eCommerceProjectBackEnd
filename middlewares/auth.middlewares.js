/**
 * Create a middlewares will check if the request body is proper ans correct
 */

const user_model=require("../models/user.model")

const verifySignUpBody=async (req,res,next) =>{
    try{
        //check for the name
        if(!req.body.name){
            return res.status(400).send({
                message: "Failed ! Name was not provided in request Body"
            })
        }

        //check for the email
        if(!req.body.email){
            return res.status(400).send({
                message: "Failed ! email was not provided in request Body"
            })
        }

        //check for the userId
        if(!req.body.userId){
            return res.status(400).send({
                message: "Failed ! UserId was not provided in request Body"
            })
        }

        //check if the user with the same userId is already present
        const user=await user_model.findOne({userId :req.body.userId})
        if(user){
           
            return res.status(400).send({
                message: "Failed ! Same userId is already present"
            })
            
        }

        next()

    }
    catch(err){
        console.log("Error while validating the request object" ,err)
        res.status(500).send({
            message : "Error while validating the request body "
        })
    }
}

const verifySignInBody=async (req,res,next) =>{
    if(!req.body.userId){
        return res.status(400).send({
            message : "User id is not provided"
        })
    }

    if(!req.body.password){
        return res.status(400).send({
            message : "passWord is not provided"
        })
    }
    next()
}

module.exports={
    verifySignUpBody : verifySignUpBody,
    verifySignInBody : verifySignInBody
}