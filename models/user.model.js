const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = mongoose.Schema({
    emailAddress: {
        type: String,
        required: true,
        trim: true
    }
})

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Users', userSchema)