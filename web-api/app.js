var express = require('express');
const fs = require('fs');
const path = require('path')

require("dotenv/config");
var bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

logger = (req, res, next) => {
    console.log(`Logged ${req.url} ${req.method} -- ${new Date()}`);
    next();
};
app.use(logger);

app.get('/read', (req, res) => {
    // let rawdata = fs.readFileSync('data.json');
    let rawdata = fs.readFileSync(path.join(__dirname, 'student.json'));
    let student = JSON.parse(rawdata);
    console.log(student);
    res.status(200).send(student);
});

app.get('/write', (req, res) => {
    let newStudent = {
        name: 'Marija',
        age: 31,
        gender: 'Female',
        department: 'Macedonian',
        car: 'Beetle'
    };
    let data = JSON.stringify(newStudent, null, 4);
    fs.writeFileSync(path.join(__dirname, 'data.json'), data);
    res.status(201).send(newStudent);
});


app.get('/users', (req, res) => {
    let rawdata = fs.readFileSync(path.join(__dirname, 'student.json'));
    let users = JSON.parse(rawdata);
    res.status(200).send(users);
});

app.get('/users/:number', (req, res) => {
    let rawdata = fs.readFileSync(path.join(__dirname, 'student.json'));
    let users = JSON.parse(rawdata);

    let currentUser = users.filter((obj) => {
        let selectedUser = obj.id == req.params.number
        return selectedUser;
    });

    res.status(200).send(currentUser[0].email);
});

app.post('/users', (req, res) => {
    let rawdata = fs.readFileSync(path.join(__dirname, 'student.json'));
    let users = JSON.parse(rawdata);

    users.push(req.body);

    let data = JSON.stringify(users, null, 4);
    fs.writeFileSync(path.join(__dirname, 'student.json'), data);

    res.status(201).send("User has been created!");
});

app.put('/users/:number', (req, res) => {

    let rawdata = fs.readFileSync(path.join(__dirname, 'student.json'));
    let users = JSON.parse(rawdata);

    users.forEach((user) => {
        if (user.id === parseInt(req.params.number)) {
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
});

app.patch('/users/:number', (req, res) => {

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
});

app.delete('/users/:number', (req, res) => {
    let rawdata = fs.readFileSync(path.join(__dirname, 'student.json'));
    let users = JSON.parse(rawdata);
    // delete users[req.params.id - 1];

    let deleteStudent = users.filter(user => {
        return user.id !== parseInt(req.params.number)
    });

    let data = JSON.stringify(deleteStudent, null, 4);
    fs.writeFileSync(path.join(__dirname, 'student.json'), data);

    res.status(203).send('Deleted Successfully');
});

app.use((req, res, next) => {

    var error = new Error('not found.Try with another route');
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    var errorObj = {
        status: err.status,
        error: {
            message: err.message
        }
    }
    res.status(err.status || 500).send(errorObj)
});

var port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`API is listenig on port ${port}!`);
});





