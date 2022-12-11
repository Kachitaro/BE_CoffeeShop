import bcrypt from 'bcryptjs';
import db from '../models/index';

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let passwordAfterHash = await hashUserPassword(data.password);
            await db.User.create({
                name: data.name,
                email: data.email,
                password: passwordAfterHash,
                gender: data.gender === '1' ? true : false,
                phoneNumber: data.phoneNumber,
                address: data.address,
            });

            resolve('create new user success!');
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

let getAllUsers = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.User.findAll({
                raw: true,
            });
            resolve(data);
        } catch (e) {
            reject(e);
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

let updateUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where : {id: data.id},
            });
            if (user) {
                await user.update({
                    name: data.name,
                    email: data.email,
                    phoneNumber: data.phoneNumber,
                    address: data.address,
                    gender: data.gender === '1' ? true : false,
                });
                let allUsers = await getAllUsers();
                resolve(allUsers);
            } else {
                resolve('user not found');
            }
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createNewUser: createNewUser,
    getAllUsers: getAllUsers,
    getUserInfoByID: getUserInfoByID,
    updateUser: updateUser,
};