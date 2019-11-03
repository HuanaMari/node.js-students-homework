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

getSpecificPostQuery = (id) => {
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
};

getPostsWithUserIdQuery = (UserId) => {
    const query = "SELECT users.id,users.name,users.lastname,posts.UserId,posts.text,posts.likes FROM posts JOIN users ON users.id=posts.UserId WHERE users.id = ?";
    return new Promise((resolve,reject)=>{
        connection.query(query,[UserId],(error,results,fields)=>{
            if(error){
                reject(error)
            }else{
                resolve(results)
            }
        });
    });
};

createPostQuery = (text, likes, UserId) => {
    const query = "INSERT INTO posts (text,likes,createdOn,UserId) VALUES('" + text + "'," + likes + ", NOW(),'" + UserId + "')"
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

updatePostQuery = (text, likes, id) => {
    const query = "UPDATE posts SET text=?,likes=?,createdOn=NOW() WHERE id=?"
    return new Promise((resolve, reject) => {
        connection.query(query, [text, likes, id], (error, results, fields) => {
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
        connection.query(query, [id], (error, results, fields) => {
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
    getPostsWithUserIdQuery,
    createPostQuery,
    updatePostQuery,
    deletePostQuery
}