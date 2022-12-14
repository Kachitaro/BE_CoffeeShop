import db from "../models/index.js";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

let createNewUser = (data) => {
    return new Promise (async (resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email);
            if (check===true) {
                resolve({
                    errCode: 1,
                    message: "Email is already exist"
                });
            } else {
                let passwordAfterHash = await hashUserPassword(data.password);
                await db.User.create({
                    name: data.name,
                    email: data.email,
                    password: passwordAfterHash,
                    gender: data.gender === '1' ? true : false,
                    phoneNumber: data.phoneNumber,
                    address: data.address,
                    salary: data.salary,
                    position: data.position,
                    roleId: data.roleId,
                });
                resolve({
                    errCode: 0,
                    message: "create new user success!"
                });
            }
        } catch (e) {
            reject(e);
        }
    });
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    });
    
}

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData={};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    where:  {email: email},
                    raw: true,
                });
                if(user){
                    let check = await bcrypt.compareSync(password, user.password);
                    if(check){
                        userData.errCode = 0;
                        userData.message = "ok";
                        delete user.password;
                        userData.user = user;
                    }else{
                        userData.errCode = 3;
                        userData.message = "Wrong password";
                    }
                }else{
                    user.errCode = 2;
                    user.message = "User not found";
                }
            } else{
                userData.errCode = 1;
                userData.message = "your email isn't exist in our system";
            }
            resolve(userData);
        } catch (error) {
            reject(error);
        }
    });
};

let checkUserEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where:  {email: email},
            });
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    });
};

let getAllUser = (UserId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if(UserId === "All"){
                    users = await db.User.findAll({
                        attributes: {
                            exclude: ['password']
                        }
                })
            }
            if ( UserId && UserId !== "All"){
                    users = await db.User.findOne({
                        where: {id : UserId},
                        attributes: {
                            exclude: ['password']
                        }
                })
            }
            resolve(users);
        } catch (error) {
            reject(error);
        }
    });
};

let getUserInfoByID = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.User.findOne({
                where: {id: userId,},
            });
            if (data) {
                resolve(data);
            } else {
                resolve([]);
            }
            
        } catch (e) {
            reject(e);
        }
    });
};

let editUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    message: "missing required parameter"
                });
            }
            let user = await db.User.findOne({
                where : {id: data.id},
                raw: false,
            });
            if (user) {
                user.name = data.name;
                user.email = data.email;
                user.address = data.address;
                user.phoneNumber = data.phoneNumber;
                user.gender = data.gender === '1' ? true : false;


                await user.save();
                resolve({
                    errCode: 0,
                    message: "update user success"
                });
            } else {
                resolve({
                    errCode: 1,
                    message: "the user not found"
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};


let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where : {id: userId},
            });
            if (user) {
                await db.User.destroy({
                    where: {id: userId},
                });
                resolve('delete user success');
            }
            resolve('the user not found');
        } catch (e) {
            reject(e);
        }
    });
};


module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUser: getAllUser,
    createNewUser: createNewUser,
    //getUserInfoByID: getUserInfoByID,
    editUser: editUser,
    deleteUser: deleteUser,

};