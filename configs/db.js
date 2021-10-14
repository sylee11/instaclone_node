var mongoose = require('mongoose')

module.exports = async () => {
    await mongoose.connect(
        process.env.DB_URI || 'mongodb://localhost:27017/clone',
        null,
        (error)=>{
            if (error){
                console.log("Connect db fail", error);
            }else{
                console.log('connect db success')
            }
        }
    )

}

