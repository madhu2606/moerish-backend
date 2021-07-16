const userModel = require("../../models/userModel");
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const config = require('../../config/params');

class UserController {
    constructor() {
    }

    loginUser(req) {
        let that = this;
        return new Promise(async (resolve, reject) => {
            try {
                let request = req.body;
                if (!request.username || !request.password)
                    return resolve({
                        success: false,
                        message: "Missing Mandatory Fields"
                    });
                let bufferObj = Buffer.from(request.password, "base64");
                let password = bufferObj.toString("utf8");
                request.username = request.username.replace(/'/g, '');
                let query = `SELECT * FROM users WHERE username = '${request.username}'`;
                let response = await userModel.getSingleRecord(query);
                
                if (!response.success || response.data.length == 0)
                    return resolve(response);
                const validPassword = await bcrypt.compare(password, response.data[0].password);
                if (!validPassword)
                    return resolve({
                        success: false,
                        message: "Invalid Password"
                    });
                let userData = response.data[0];
                delete userData.password;
                
                var token = jwt.sign({ ...userData }, config.secret, {
                    algorithm: "HS256"
                });
                resolve({
                    success: true,
                    token
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    updatePassword(req) {
        let that = this;
        return new Promise(async (resolve, reject) => {
            try {
                let request = req.body;
                if (!request.email || !request.admin_password || !request.new_password)
                    return resolve({
                        success: false,
                        message: "Missing Mandatory Fields"
                    });
                let bufferObj = Buffer.from(request.new_password, "base64");
                let password = bufferObj.toString("utf8");
                request.email = request.email.replace(/'/g, '');
                request.admin_password = request.admin_password.replace(/'/g, '');
                let query = `SELECT * FROM pharma_users WHERE email = '${request.email}' and secret_key = '${request.admin_password}'`;
                let response = await userModel.getSingleRecord(query);
                if (!response.success || response.data.length == 0)
                    return resolve(response);
                let salt = await bcrypt.genSalt(10);
                request.hashed = await bcrypt.hash(password, salt);
                delete request.new_password;
                let columns = ['hashed'];
                let data = [request.hashed];
                let condition = `id = ${response.data[0].id}`;
                let finalResponse = await userModel.updateRecord(columns, data, condition);
                return resolve(finalResponse);
            } catch (error) {
                reject(error);
            }
        });
    }

    addNewUser(req) {
        let that = this;
        return new Promise(async (resolve, reject) => {
            try {
                let request = req.body;
                let bufferObj = Buffer.from(request.password, "base64");
                let password = bufferObj.toString("utf8");
                let salt = await bcrypt.genSalt(10);
                request.password = await bcrypt.hash(password, salt);
                // delete request.password;
                let response = await userModel.insertNewRecord(request);
                return resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    }

    getUser(req) {
        let that = this;
        return new Promise(async (resolve, reject) => {
            try {
                // console.log(req['user_info']);
                let columns = ['id', 'first_name', 'last_name', 'mobile', 'email', 'branch', 'status', 'address', 'created_date'];
                let response = await userModel.getAllRecords(columns);
                return resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    }

    updateUser(req) {
        let that = this;
        return new Promise(async (resolve, reject) => {
            try {
                let request = req.body;
                let columns = ['first_name', 'last_name', 'mobile', 'email', 'branch', 'status', 'address'];
                let data = [request.first_name, request.last_name, request.mobile, request.email, request.branch, request.status, request.address];
                let condition = `id = ${request.id}`;
                let response = await userModel.updateRecord(columns, data, condition);
                return resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    }
}

module.exports = new UserController();