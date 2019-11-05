const connection = require("../dataBase");

getAllUsersQuery = () => {
    const query = 'SELECT * FROM users'
    return new Promise((resolve, reject) => {
        connection.query(query, function (error, results, fields) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

getSpecificUserQuery = (id) => {
    const query = 'SELECT * FROM users WHERE id = ?'
    return new Promise((resolve, reject) => {
        connection.query(query, [id], function (error, results, fields) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

findUserByNameQuery = (name) => {
    const query = 'SELECT * FROM users WHERE name = ?'
    return new Promise((resolve, reject) => {
        connection.query(query, [name], (error, results, fields) => {
            if (error) {
                reject(error)
            } else {
                resolve(results)
            }
        })
    })
};

createUserQuery = (user,password) => {
    const query = 'INSERT INTO users(name, lastname, email, age, IsActive,password) VALUES (?, ?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
        connection.query(query,[user.name,user.lastname,user.email,user.age,user.isActive,password],(error, results, fields) => {
            if (error) {
                reject(error)
            } else {
                resolve(results)
            }
        })
    })
};

updateUserQuery = (name, lastname, email, age, isActive,id) => {
    const query = "UPDATE users SET name=?,lastname=?,email=?,age=?,isActive=? WHERE id=?"
    return new Promise((resolve, reject) => {
        connection.query(query, [name, lastname, email, age, isActive, id], (error, results, fields) => {
            if (error) {
                reject(error)
            } else {
                resolve(results)
            }
        });
    });
};

deleteUserQuery = (id) => {
    const query = 'DELETE FROM users WHERE id = ?'
    return new Promise((resolve, reject) => {
        connection.query(query, [id], function (error, results, fields) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

getUserByEmailQuery = (email) => {
    const query = 'SELECT * FROM users WHERE email = ?'
    return new Promise((resolve, reject) => {
        connection.query(query, [email], function (error, results, fields) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

module.exports = {
    getAllUsersQuery,
    getSpecificUserQuery,
    findUserByNameQuery,
    createUserQuery,
    updateUserQuery,
    deleteUserQuery,
    getUserByEmailQuery
}
