const path = require('path')
const fs = require('fs');
var bcrypt = require('bcryptjs');
const { emailValidator, ageValidator } = require('../helper');
const { getAllUsersQuery,
    getSpecificUserQuery,
    findUserByNameQuery,
    createUserQuery,
    updateUserQuery,
    deleteUserQuery,
    getUserByEmailQuery } = require("./wrappers_Users");


getAllUsers = async (req, res, next) => {
    try {
        const allUsers = await getAllUsersQuery();
        res.status(200).send(allUsers);
    } catch (error) {
        res.status(500).send(error);
    }
};
getSpecUser = async (req, res, next) => {
    if (req.params.id <= 0) {
        var error = new Error("Id can not be 0!");
        error.status = 401;
        next(error);
    }
    try {
        const specUser = await getSpecificUserQuery(req.params.number);
        res.status(200).send(specUser[0]);
    } catch (error) {
        res.status(500).send(error);
    }
};
findUserByName = async (req, res, next) => {
    try {
        const userName = await findUserByNameQuery(req.params.name);
        res.status(200).send(userName[0]);
    } catch (error) {
        res.status(500).send(error)
    }
};
createUser = async (req, res, next) => {
    // const users = await getAllUsersQuery();
    // const ifUserExist = users.some(user => {
    //     return req.body.email === user.email
    // });
    // let isValid = emailValidator(req.body.email);
    // if (ifUserExist) {
    //     var error = new Error('email is already used');
    //     error.status = 402;
    //     next(error);
    // }
    // else if (!isValid) {
    //     var error = new Error('email is not valid');
    //     error.status = 402;
    //     next(error);
    // }
    // else if (!ageValidator(req.body.age)) {
    //     var error = new Error('you are under 18');
    //     error.status = 402;
    //     return next(error);
    // }
    try {
        const userRequest = req.body
        const passHash = bcrypt.hashSync(userRequest.password, 10)
        await createUserQuery(userRequest, passHash)
        res.status(200).send('User has been created');
    } catch (error) {
        res.status(500).send(error.message)
    }

};


updateUser = async (req, res, next) => {
    const users = await getAllUsersQuery();
    let isValid = emailValidator(req.body.email);

    users.filter(user => {
        if (!user.id === parseInt(req.params.id)) {
            var error = new Error('user does not exist');
            error.status = 402;
            next(error);
        }
        else if (!isValid) {
            var error = new Error('email is not valid');
            error.status = 402;
            next(error);
        }
    });
    try {
        await updateUserQuery(req.body.name, req.body.lastname, req.body.email, req.body.age, req.body.isActive, req.params.id);
        res.status(202).send('Update Successfully');
    } catch (error) {
        res.status(500).send(error.message)
    }

}

partUpdate = async (req, res, next) => {
    const users = await getAllUsersQuery();
    let isValid = emailValidator(req.body.email);
    var ifUserExists = users.some(user => {
        return user.id == parseInt(req.params.number)
    });

    if (!ifUserExists) {
        var error = new Error(`User with this ID does not exist`);
        error.status = 400;
        return next(error);
    }
    if (req.body.name == null || req.body.lastname == null) {
        var error = new Error('Name and Lastname must been entered !');
        error.status = 401;
        return next(error);
    }

    var filteredUsers = users.filter(user => {
        if (user.id === parseInt(req.params.number)) {
            user.name = req.body.name
            user.surname = req.body.lastname
            if (req.body.email == null) {
                user.email = user.email
            } else {
                if (!isValid) {
                    var error = new Error('email is not valid');
                    error.status = 402;
                    next(error);
                } else {
                    user.email = req.body.email
                }
            }
            if (req.body.age == null) {
                user.age = user.age
            } else {
                user.age = req.body.age
            }
            if (req.body.isActive == null) {
                user.isActive = user.isActive
            } else {
                user.isActive = req.body.isActive
            }
            return user
        }
    });
    var userToPatch = filteredUsers[0];
    try {
        await updateUserQuery(userToPatch.name, userToPatch.lastname, userToPatch.email, userToPatch.age, userToPatch.isActive, req.params.number);
        res.status(202).send('Update Successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

deleteUser = async (req, res, next) => {
    try {
        await deleteUserQuery(req.params.number);
        res.status(202).send('Deleted Successfully');
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}

loginUser = async (req, res, next) => {
    const email = req.body.email;
    const pass = req.body.password;
    try {
        var user = await getUserByEmailQuery(email);
        var newUser = user[0];
        const matchPass = bcrypt.compare(pass,newUser.password);
        if (matchPass) {
            res.status(202).send('password match');
        }
    }
    catch (error) {
        res.status(401).send("wrong password");
    }
}
module.exports = {
    getAllUsers,
    getSpecUser,
    findUserByName,
    createUser,
    updateUser,
    partUpdate,
    deleteUser,
    loginUser
}
