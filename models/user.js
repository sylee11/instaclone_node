const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcrypt')
const requestError = require('../errorhandle/RequestError')

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            require: true,
            unique: true,
            validate: (value) => {
                if(!validator.isEmail(value)){
                    throw new Error('Invalid email address')
                }
            }
        },
        fullName: String,
        userName: String,
        password: {
            type: String,
            minLength: 8,
        },
        avatar: String,
        bio: String,
        website: String,
        bookmarks: String,
        githubId: Number,
        confirmed: {
            type: Boolean,
            default: false
        }
    }
);
userSchema.pre('save', function (next){
    const saltRounds = 10;
    bcrypt.hash(this.password, saltRounds, (error, hash)=>{
        this.password = hash
        next()
    })
});

userSchema.pre('save', async function (next){
    const document = await User.findOne({email: this.email}).select("_id").lean();
    if (document){
        next(new requestError(
            'A user already',
            400
        ))
    }
});


User = mongoose.model('User', userSchema);
module.exports = User;