const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
const validator = require('validator')
const userSchema = new mongoose.Schema({
    first_name:{
        type: String,
        unique: false,
        required: [true, "Please provide a first name"]

    },
    last_name:{
        type: String,
        unique: false,
        required: [true, "Please provide a last name"]
    },
    username:{
        type: String,
        unique:[true, 'username already exists'],
        required: [true, "Please provide a username"]
    },
    email: {
        type: String,
        required: [true, "Please Provide a email!"],
        unique: [true, "Email already exists"],
    },
    password: {
        type: String,
        required: [true, "Please Provide a password"],
        unique: false
    },
    exercises: {
        type: Array,
        unique: false,
        required: false
    },
    routines: {
        type: Array,
        unique: false,
        required: false

    }
})

//static sign up method

userSchema.statics.signup = async function(first_name, last_name, username, email, password){
    //validation
    if(!email || !password || !username){
        throw Error('All fields must be filled')
    }
    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    } 
    if(!validator.isStrongPassword(password)){
        throw Error('Password is not strong enough')
    }

    const emailExists = await  this.findOne({email})
    const usernameExists = await this.findOne({username})

    if(emailExists) {
        throw Error('Email already in use')
    }
    if(usernameExists){
        throw Error('Username already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const user = await this.create({first_name, last_name, username, email, password: hash})

    return user


}

userSchema.statics.login = async function(email, password){
    if(!email || !password){
        throw Error('All fields must be filled')
    }
    const user = await this.findOne({email})

    if(!user){
        throw Error('Email was not found')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error('Incorrect password')
    }
    return user;
}
module.exports = mongoose.model.Users || mongoose.model("Users", userSchema);