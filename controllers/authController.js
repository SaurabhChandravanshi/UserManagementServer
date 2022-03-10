const User = require('../models/User');


module.exports.signup =  async (req, res) => {
    try {
        await User.create({name:req.body.name, email:req.body.email, password:req.body.password});
        res.status(201).json({'status':'success', 'message':'User created successfully.'})
    } catch(err) {
        res.status(401).json({'status':'failed', 'message':'Failed to create Account.'})
    }
}

module.exports.signin = async (req, res) => {
    try {
        const data = await User.login(req.body.email, req.body.password);
        res.status(201).json({'status':'success', id:data._id, 'message':'Login succeed.'})
    } catch(err) {
        res.status(401).json({'status':'failed', 'message':'Failed to get user Account.'})
    }
}