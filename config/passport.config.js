//create file as config to initialize passport
//defining local strategy
const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const userService = require('../services/userService')

const authenticateUser = async (email, password, done) => {
    //get user by userNameField
    const user = await userService.getUserByEmail(email)
    //check whether user is present or not
    //if not present return false
    if(user == null) {
        console.log('User not found with email ' + email)
        return done(null, false, {message: 'No user with email ' + email})
    }

    //if user is present i.e not equal to null check password
    try {
        //if password is correct return user
        if(await bcrypt.compare(password, user.password)) {
            return done(null, user)
        }
        else {
            console.log('Wrong password')
            return done(null, false, {message: 'Wrong Password for email ' + email})
        }
    }
    catch(e) {
        //if any other error occurs return error
        return done(e)
    }
}

//our passport initialization
/**
 * authenticateUser is the function to authenticate whether a user is
 * present in database or not by matching its userNameField and password
 */
const initialize = (passport) => {
    passport.use(new localStrategy({
        usernameField: 'email'
    }, authenticateUser))
    //serialize and deserialize data to maintain session of a user
    passport.serializeUser((user, done) => {
        return done(null, user.id)
    })
    passport.deserializeUser((id, done) => {
        return done(null, userService.getUserById(id))
    })
}

module.exports = initialize