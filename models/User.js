const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    username : {
        type : String ,
        required : true , 
        unique : true
    } , 
    email : {
        type : String , 
        required : true,
        unique : true
    } , 
    password : {
        type : String , 
        required : true
    } , 
    role : {
        type : String , 
        default : 'student',
        enum : ['student' , 'lecturer']
    }
})

userSchema.statics.login = async function(email , password) {

    if(!email || !password){
        throw Error('Please Fill all the fields')
    }

    const user = await this.findOne({email})

    if(!user){
        throw Error('Invalid Email or Password')
    }

    const match = await bcrypt.compare(password , user.password)

    if(!match){
        throw Error('Invalid Email or Password')
    }

    return user
}

userSchema.statics.signup = async function(email , password , username){

    // if(!email || !password  || !username){
    //     throw Error('Please Fill all the fields')
    // }

    if(!validator.isEmail(email)){
        throw Error('Invalid Email')
    }

    if(!validator.isStrongPassword(password)){
        throw Error('Password not strong enough')
    }

    const user = await this.findOne({email})

    if(user){
        throw Error('User aleady Exists with this email')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password , salt)

    return hash

}




module.exports = mongoose.model('User' , userSchema)