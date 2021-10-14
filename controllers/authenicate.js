const User = require('../models/user');
const requestError = require('../errorhandle/RequestError')
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple')


module.exports.loginController = async (req, res, next)=>{
    const {email, password} = req.body
    try{
        const user = await User.findOne({email: email})
        if (user){
            bcrypt.compare(password, user.password, (err, result)=>{
                if(err) { next(err)};
                if (result == true){
                    const jwt_end = jwt.encode(
                        {
                            id: user.id
                        },
                        process.env.SECRET,
                        "HS256"
                    )
                    res.send({
                        token: jwt_end
                    })
                }
            })
        }else {
            next(new requestError('Not found user', 404))
        }
    }catch (e) {
        next(e)
    }

}

module.exports.requireAuth = async (req, res, next) => {
    const {authorization} = req.headers;
    try {
        let token = authorization.split(' ')[1]
        const user = await this.verifyJwt(token);
        res.locals.user = user;
        next()
    }catch (e){
        return res.status(401).send({ error: e });
    }
}

module.exports.verifyJwt = (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            const id = jwt.decode(token, process.env.SECRET).id;
            const user = await User.findOne(
                { _id: id },
                'email username avatar bookmarks bio fullName confirmed website'
            );
            if (user) {
                return resolve(user);
            } else {
                reject('Not authorized.');
            }
        } catch (err) {
            return reject('Not authorized.');
        }
    });
};