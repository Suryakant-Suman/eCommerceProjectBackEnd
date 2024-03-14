/**
 * satarting file of the project
 */

const express=require("express")
const mongoose=require("mongoose")

const app=express()

const server_fonfig=require("./configs/server.configs.js")
const db_config=require("./configs/db.config.js")
const user_model = require("./models/user.model.js")
const bcrypt=require("bcryptjs")
app.use(express.json())

/**
 * create an admin users at the starting of the application
 * If not already present
 */
/**
 * Connection with mongodb
 */
mongoose.connect(db_config.DB_URL)
const db=mongoose.connection
db.on("error" ,()=>{
    console.log("Error while connecting with mongoDB")
})
db.once("open", ()=>{
    console.log("Connected to mongoDb successfully")
    init()
})

async function init(){
    try{
        let user=await user_model.find({userId : "ADMIN"})
        if(user){
            console.log("admin is already present")
            return
        }
    }catch(err){
        console.log("Error while reading the data ", err)
    }

    try{
        user=await user_model.create({
            name: "Suryakant Suman",
            userId:"ssuryakant370",
            email : "ssuryakant370@gmail.com",
            userType:"ADMIN",
            password : bcrypt.hashSync("Welcome1",8)
        })
        console.log("Admin Created", user)
    }
    catch(err){
        console.log("Error While creating Admin", err)
    }
}
/**
 * Stich the routr to the server
 */
require("./routes/auth.routes.js")(app)

/**
 * Start the Server
 */
app.listen(server_fonfig.PORT, () =>{
    console.log("Server Started at port num : ", server_fonfig.PORT)
})