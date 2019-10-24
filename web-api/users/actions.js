const path = require('path')
const fs = require('fs');
const { emailValidator , ageValidator} = require('../helper');


getAllUsers = (req, res) => {
    let rawdata = fs.readFileSync(path.join(__dirname, 'student.json'));
    let users = JSON.parse(rawdata);
    res.status(200).send(users);
};

getSpecUser = (req, res, next) => {
    let rawdata = fs.readFileSync(path.join(__dirname, 'student.json'));
    let users = JSON.parse(rawdata);


    console.log(req.params.number)
    if (req.params.number == 0 || req.params.number > users.length) {
        var error = new Error('ne pomalo od 1');
        error.status = 401;
        next(error);
    }

    let currentUser = users.filter((obj) => {
        let selectedUser = obj.id == req.params.number
        return selectedUser;
    });

    res.status(200).send(currentUser[0]);
};

findUserByName = (req, res, next) => {
    let info = fs.readFileSync(path.join(__dirname, 'student.json'));
    let users = JSON.parse(info);

    let currentUser = users.filter(user => {
        var toMatch = user.name === req.params.name
        return toMatch
    });
    if (currentUser.length == 0) {
        var error = new Error("user does not exist");
        error.status = 404;
        next(error);
    }
    else {
        res.status(200).send(currentUser)
        return currentUser
    }
};
createUser = (req, res, next) => {
    let rawdata = fs.readFileSync(path.join(__dirname, 'student.json'));
    let users = JSON.parse(rawdata);

    let isValid = emailValidator(req.body.email);
    
    if (!isValid) {
        var error = new Error('email is not valid');
        error.status = 402;
        next(error);
    }
    else if (!ageValidator(req.body.age)){
        var error = new Error('kade ti se roditelite?');
        error.status = 402;
        next(error);
    }
    else {
        users.push(req.body);
        let data = JSON.stringify(users);
        fs.writeFileSync(path.join(__dirname, 'student.json'), data);
        res.status(201).send("User has been created!");
    }

};

updateUser = (req, res) => {

    let rawdata = fs.readFileSync(path.join(__dirname, 'student.json'));
    let users = JSON.parse(rawdata);

    users.forEach(user => {
        if (user.id === parseInt(req.params.id)) {
            user.name = req.body.name
            user.surname = req.body.surname
            user.email = req.body.email
            user.age = req.body.age
            user.isActive = req.body.isActive

            let data = JSON.stringify(users, null, 4);
            fs.writeFileSync(path.join(__dirname, 'student.json'), data);

            res.status(202).send('Update Successfully');
        }
    });
};

partUpdate = (req, res) => {

    let rawdata = fs.readFileSync(path.join(__dirname, 'student.json'));
    let users = JSON.parse(rawdata);

    users.forEach(user => {
        if (user.id === parseInt(req.params.number)) {
            user.name = req.body.name
            user.surname = req.body.surname

            let data = JSON.stringify(users, null, 4);
            fs.writeFileSync(path.join(__dirname, 'student.json'), data);

            res.status(202).send('Update Successfully');
        }
    });
};

deleteUser = (req, res) => {
    let rawdata = fs.readFileSync(path.join(__dirname, 'student.json'));
    let users = JSON.parse(rawdata);
    // delete users[req.params.id - 1];

    let deleteStudent = users.filter(user => {
        return user.id !== parseInt(req.params.number)
    });

    let data = JSON.stringify(deleteStudent, null, 4);
    fs.writeFileSync(path.join(__dirname, 'student.json'), data);

    res.status(203).send('Deleted Successfully');
}

module.exports = {
    getAllUsers,
    getSpecUser,
    findUserByName,
    createUser,
    updateUser,
    partUpdate,
    deleteUser
}