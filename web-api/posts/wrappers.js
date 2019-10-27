const connection = require("../dataBase");


getAllPostsQuery = () => {
    const query = 'SELECT * FROM posts'
    return new Promise((resolve, reject) => {
        connection.query(query, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

getSpecificPostQuery = async (id) => {
    const query = "SELECT * FROM posts WHERE id = ?";
    return new Promise((resolve, reject) => {
        connection.query(query, [id], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

createPostQuery = (text, likes) => {
    const query = "INSERT INTO posts (text,likes,createdOn) VALUES('" + text + "'," + likes + ", NOW() )"
    return new Promise((resolve, reject) => {
        connection.query(query, (error, results, fields) => {
            if (error) {
                reject(error)
            } else {
                resolve(results)
            }
        })
    })
};

updatePostQuery = (text,likes,id) => {
    const query = "UPDATE posts SET text=?,likes=?,createdOn=NOW() WHERE id=?"
    return new Promise((resolve, reject) => {
        connection.query(query, [text,likes,id], (error, results, fields) => {
            if (error) {
                reject(error)
            } else {
                resolve(results)
            }
        });
    });
};

deletePostQuery = (id) => {
    const query = 'DELETE FROM posts WHERE id = ?'
    return new Promise((resolve, reject) => {
        connection.query(query, [id],  (error, results, fields)=> {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

module.exports = {
    getAllPostsQuery,
    getSpecificPostQuery,
    createPostQuery,
    updatePostQuery,
    deletePostQuery
}