const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.pre('save', async function (next){
    const user = this;
    if (this.isModified('password') || this.isNew) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(user.password, salt, null);
            user.password = hashedPassword;
            next();
        } catch(err) {
            return next(err);
        }
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword =  async function(passw, next) {

    try {
        const isMatch = await bcrypt.compare(passw, this.password); 
        next(null, isMatch);
    } catch(err) {
        return next(err);
    }
};

mongoose.model('User', UserSchema);
