const { User } = require("../models");

const createUser = async (userBody) => {
    const user = await User.findOne({userId: userBody.userId})
    if (user) {
        return user;
    }
    const newUser = User.create(userBody);
    return newUser;
};

const getUserByUserId = async (userId) => {
    return User.findOne({userId});
};

const getDailyTask = async (userId) => {
    const user = await User.findOne({userId: userId})
    return user.dailyTask;
}

module.exports = {
    createUser,
    getUserByUserId,
    getDailyTask
}