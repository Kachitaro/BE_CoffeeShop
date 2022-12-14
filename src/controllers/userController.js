import userServices from "../services/userServices.js";


let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if(!email || !password){
        return res.status(500).json({
            errCode: 1,
            message: "Missing input parameters" 
        });

    }
    
    let userData = await userServices.handleUserLogin(email, password);

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.message,
        user: userData.user ? userData.user : {}
    });
};

let handleGetAllUser = async (req, res) => {
    let UserId = req.query.UserId;
    if(!UserId){
        return res.status(500).json({
            errCode: 1,
            message: "Missing input parameters",
            users: []
        });

    }
    let users = await userServices.getAllUser(UserId);

    return res.status(200).json({
        errCode: 0,
        message: "Success",
        users: users
    });
};

let handleCreateNewUser = async (req, res) => {
    let message = await userServices.createNewUser(req.body);
    return res.status(200).json({
        errCode: message.errCode,
        message: message.message
    });
};

let handleEditUser = async (req, res) => {
    let data = req.body;
    let message = await userServices.editUser(data);
    return res.status(200).json({
        message: message
    });
};

let handleDeleteUser = async (req, res) => {
    if (!req.query.id) {
        return res.status(200).json({
            errCode: 1,
            message: "Missing input parameters"
        });
    }
    let message = await userServices.deleteUser(req.query.id);
    return res.status(200).json({message: message});
};


module.exports = {
    handleLogin: handleLogin,
    handleGetAllUser: handleGetAllUser,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser
};