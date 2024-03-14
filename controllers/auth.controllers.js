/**
 * I need to write the controller / logic to register a user
 */
const bcrypt=require("bcryptjs")
const user_model=require("../models/user.model")
exports.signup =async (req, res) =>{
    /**
     * Logic to create user
     */

    //1.read the request body
    const request_body=req.body

    //2. Insert the data in the users collections in db
    const userObj={
        name : request_body.name,
        userId :request_body.userId,
        email : request_body.email,
        userType : request_body.userType, 
        password : bcrypt.hashSync(request_body.password, 8)
    }

    try{
        const user_created=await user_model.create(userObj)
        /**
         * RETURN THIS USER
         */
        const re_obj={
            name : user_created.name,
            userId : user_created.userId,
            email : user_created.email,
            userType : user_created.userType,
            createdAt : user_created.createdAt,
            updatedAt : user_created.updatedAt
        }
        res.status(201).send(re_obj)
    }
    catch(err){
        console.log("Error while Registering the user ",err)
        res.status(500).send({
            message :"Some error happened while registering the user"
        })
    }

    //3. return the Response back to the user

}