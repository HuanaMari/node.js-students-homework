emailValidator = (email) => {

    var validEmail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!validEmail.test(email)) {
        return false
    }
    else {
        return true
    }
};

ageValidator = (age) => {
    return age > 18
}

module.exports = {
    emailValidator,
    ageValidator
}