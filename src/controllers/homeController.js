import db from "../models/index.js";
import CRUDservices from "../services/CRUDservices.js";

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
    }catch(e){
        console.log(e);
    }
};

let getCRUD = (req, res) => {
    return res.render('crud.ejs');
};

let postCRUD = async (req, res) => {
    let messages = await CRUDservices.createNewUser(req.body);
    console.log(messages);
    return res.send('post crud form success')
};

let displayCRUD = async (req, res) => {
    let data = await CRUDservices.getAllUsers();
    return res.render('displayCRUD.ejs', {
        dataTable: data
    });
};

let editCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let UserData = await CRUDservices.getUserInfoByID(userId);
        return res.render('editCRUD.ejs', {
            userData: UserData
        });
    } else {
        return res.send('user id not found');   
    }
};

let deleteCRUD = async (req, res) => {};

let putCRUD = async (req, res) => {
    let data = req.body;
    await CRUDservices.updateUserInfo(data);
    return res.send('update user info success');
};



module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayCRUD: displayCRUD,
    editCRUD: editCRUD,
    deleteCRUD: deleteCRUD,
    putCRUD: putCRUD,
};