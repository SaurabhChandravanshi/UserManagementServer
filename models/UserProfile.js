const mongoose =  require("mongoose");

const UserProfileSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email: {
        type:String,
        unique:true,
        required:true
    },
    role: {
        type:String,
        default:'Contributor'
    },
    owner:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('UserProfile', UserProfileSchema)