/**
 * POST 0.0.0.0:8080/ecomm/api/v1/auth/categories
 */
const categoryController=require("../controllers/category.controllers")
const authMW=require("../middlewares/auth.middlewares")


module.exports=(app)=>{
    app.post("/ecomm/api/v1/auth/categories",[authMW.verifyToken, authMW.isAdminCheck],categoryController.createNewCategories)
}