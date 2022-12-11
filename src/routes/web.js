import express from "express";
import homeController from "../controllers/homeController";


let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", homeController.getHomePage);
    router.get("/crud", homeController.getCRUD);
    router.get("/get-crud", homeController.displayCRUD);

    router.get("/edit-crud", homeController.editCRUD);
    router.get("/delete-crud", homeController.deleteCRUD);
    
    router.post("/create-crud", homeController.postCRUD);

    router.post("/put-crud", homeController.putCRUD);
    

    return app.use("/", router);
}

module.exports = initWebRoutes;