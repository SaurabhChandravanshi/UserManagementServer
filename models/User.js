const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    timestamp:{
        type:Date,
        default:Date.now
    }
})

// The below code will fire before saving data to DB.
UserSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt(); // Get Salt (Which will be used to encrypt the password.)
    this.password = await bcrypt.hash(this.password, salt); // Update password with hashed password.
    next() // execute next middleware.
})

// Static method to login user.
UserSchema.statics.login = async function(email, password) {
    const user = await this.findOne({email}) // Find one user with this email
    if(user) {
        // compare password with hash password.
        const auth = await bcrypt.compare(password, user.password) 
        if(auth) {
            return user; 
        } else {
            throw new Error('Invalid password.');
        }
    }
    throw new Error('Invalid email address.')
}

module.exports = mongoose.model('User', UserSchema);