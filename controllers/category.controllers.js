const category_model=require("../models/category.models")

/**
 * Controller for creating categories
 * 
 * POST 0.0.0.0:8080/ecomm/api/v1/auth/categories
 * 
 * {
    "name": "HouseHolds",
    "description" : "This will have all the household items"
    }
 */

    exports.createNewCategories =async (req, res) =>{
        //Read the req body 


        //craete the categoris object
        const categories_data={
            name : req.body.name,
            description : req.body.description
        }

        //Insert into mongodb
        try{
            const category=await category_model.create(categories_data)
            return res.status(201).send(category)
        }
        catch(err){
            console.log("err while creating the categories",err)
            return res.status(500).send({
                message : "err while creating the categories"
            })
        }
        
        //return the response of the created categories
    }

    exports.getcategories=async(req, res)=>{
        try{
            const categories=await category_model.find();
            return res.status(201).send(categories);
        }
        catch(err){
            console.log("Error while fetching data : ",err)
            return res.status(501).send({
                message: "Error while fatching data from database"
            })
        }
    }