import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", homeController.getHomePage);
    router.get("/crud", homeController.getCRUD);
    router.get("/get-crud", homeController.displayCRUD);
    router.get("/edit-crud", homeController.editCRUD);
    router.get("/delete-crud", homeController.deleteCRUD);
    router.post("/create-crud", homeController.postCRUD);
    router.post("/put-crud", homeController.putCRUD);


    router.post("/api/login", userController.handleLogin);
    router.get("/api/get-all-user", userController.handleGetAllUser);
    router.post("/api/create-new-user", userController.handleCreateNewUser);
    router.put("/api/edit-user", userController.handleEditUser);
    router.delete("/api/delete-user", userController.handleDeleteUser);
    
    router.get("/api/get-all-code", userController.getAllcode)

    return app.use("/", router);
}

module.exports = initWebRoutes;