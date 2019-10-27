const path = require('path')
const fs = require('fs');
const { getAllPostsQuery,
    getSpecificPostQuery,
    createPostQuery,
    deletePostQuery } = require('./wrappers');


getAllPosts = async (req, res, next) => {
    try {
        const allPosts = await getAllPostsQuery();
        res.status(200).send(allPosts);
    } catch (error) {
        res.status(500).send(error);
    }
};

getSpecPost = async (req, res, next) => {
    const posts = await getAllPostsQuery();
    const ifPostExist = posts.some(post => {
        return req.params.id === post.id
    });
    if (ifPostExist) {
        var error = new Error('post does not exist');
        error.status = 402;
        next(error);
    }
    try {
        const specPost = await getSpecificPostQuery(req.params.id);
        res.status(200).send(specPost[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

createPost = async (req, res, next) => {
    try {
        await createPostQuery(req.body.text, req.body.likes);
        res.status(200).send('Post has been created');
    } catch (error) {
        res.status(500).send(error.message)
    }
};

updatePost = async (req, res, next) => {
    let posts = await getAllPostsQuery();
    let ifPostExist = posts.filter(post => {
        return post.id === parseInt(req.params.id)
    });
    if (!ifPostExist) {
        var error = new Error('post does not exist');
        error.status = 402;
        return next(error);
    }
    try {
        await updatePostQuery(req.body.text, req.body.likes, req.params.id);
        res.status(202).send('Update Successfully');
    } catch (error) {
        res.status(500).send(error.message)
    }
};

patchPost = async (req, res, next) => {
    let posts = await getAllPostsQuery();
    let ifPostExist = posts.some(post => {
        return post.id === parseInt(req.params.id)
    });
    if (!ifPostExist) {
        var error = new Error('post does not exist');
        error.status = 402;
        return next(error);
    }
    let bodyPost = posts.filter(post => {
        if (post.id === parseInt(req.params.id)) {
            if (req.body.text == null) {
                var error = new Error('post must contain text');
                error.status = 402;
                next(error);
            } else {
                post.text = req.body.text
            }
            if (req.body.likes == null){
                post.likes = post.likes
            }else{
                post.likes = req.body.likes
            }
        }
        return post
    });
    let postToPatch = bodyPost[0]
    try {
        await updatePostQuery(postToPatch.text,postToPatch.likes,req.params.id);
        res.status(200).send('Patched succsessfully')
    } catch (error) {
        res.status(500).send(error.message)
    }
}

deletePost = async (req, res, next) => {
    let posts = await getAllPostsQuery();
    let ifPostExist = posts.some(post => {
        return post.id === parseInt(req.params.id)
    });

    if (!ifPostExist) {
        var error = new Error('post does not exist');
        error.status = 402;
        return next(error);
    }
    try {
        await deletePostQuery(req.params.id);
        res.status(200).send("Deleted Successfully'")
    } catch (error) {
        res.status(500).send(error.message)
    }
}



module.exports = {
    getAllPosts,
    getSpecPost,
    createPost,
    updatePost,
    patchPost,
    deletePost
}