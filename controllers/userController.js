const UserProfile = require('../models/UserProfile');

module.exports.view = async (req, res) => {
    try {
        const data = await UserProfile.find({owner:req.params.ownerId});
        res.status(200).json({'status':'success', 'userArray':data})
    } catch(err) {
        res.status(401).json({'status':'failed', 'message':'Failed to get users.'});
    }
}

module.exports.new = async (req, res) => {
    try {
        const data = await UserProfile.create({
            name:req.body.name,
            email:req.body.email,
            role:req.body.role,
            owner:req.body.owner
        });
        res.status(201).json({'status':'success', 'message':'User created successfully.'})
    } catch(err) {
        res.status(401).json({'status':'failed', 'message':'Failed to create user.'});
    }
}


module.exports.delete = async (req, res) => {
    try {
        await UserProfile.deleteOne({_id:req.params.id})
        res.status(201).json({'status':'success', 'message':'User deleted successfully.'})
    } catch(err) {
        console.log(err)
        res.status(401).json({'status':'failed', 'message':'Failed to delete user.'});
    }
}

module.exports.update = async (req, res) => {
    try {
        const data = await UserProfile.updateOne({_id:req.params.id}, {$set:{
        name:req.body.name,
        role:req.body.role
        }})
        res.status(201).json({'status':'success', 'message':'User updated successfully.', 'userArray':data})
    } catch(err) {
        res.status(401).json({'status':'failed', 'message':'Failed to update user.'});
    }
}