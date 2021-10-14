var User = require('../models/user')

module.exports.getUser = (req, res, next) => {
    User.find().exec((err, result)=>{
        if (err) {
            return next(err)
        }else{
            res.send(result)
        }
    })
}

module.exports.createUser = async (req, res, next) => {
    var {email, password, full_name} = req.body

    var newUser = new User(
        {
            email: email,
            password: password,
            fullName: full_name
        }
    )
    try {
        await newUser.save()
        res.send("save oke")
    } catch (err){
        next(err)
    }

}