const User = require('../models/user');

class UserService {
    async createUser(data) {
        const user = new User(data);
        return await user.save();
    }

    async getAllUsers() {
        return await User.find();
    }

    async updateUser(id, data) {
        return await User.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    }

    async deleteUser(id) {
        return await User.findByIdAndDelete(id);
    }
}

module.exports = new UserService();

