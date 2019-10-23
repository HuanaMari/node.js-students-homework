emailValidator = (email) => {
    
    var validEmail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return email == validEmail;
}

module.exports = {
    emailValidator
}