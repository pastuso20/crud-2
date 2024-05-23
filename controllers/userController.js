const userService = require('../services/userService');
const errorHandler = require('../utils/errorHandler');

class UserController {
    async createUser(req, res) {
        try {
            const user = await userService.createUser(req.body);
            res.status(201).send(user);
        } catch (error) {
            errorHandler(res, error);
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
            res.status(200).send(users);
        } catch (error) {
            errorHandler(res, error);
        }
    }

    async updateUser(req, res) {
        try {
            const user = await userService.updateUser(req.params.id, req.body);
            if (!user) {
                return res.status(404).send();
            }
            res.status(200).send(user);
        } catch (error) {
            errorHandler(res, error);
        }
    }

    async deleteUser(req, res) {
        try {
            const user = await userService.deleteUser(req.params.id);
            if (!user) {
                return res.status(404).send();
            }
            res.status(200).send(user);
        } catch (error) {
            errorHandler(res, error);
        }
    }
}

module.exports = new UserController();

