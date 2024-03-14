/**
 * POst localhost:8080/eComm/api/auth/signup
 * 
 * i need to intercept this
 */

const authController=require("../controllers/auth.controllers")

const authMW = require("../middlewares/auth.middlewares")

module.exports=(app)=>{
    app.post('/ecomm/api/v1/auth/signup',[authMW.verifySignUpBody],authController.signup)
}