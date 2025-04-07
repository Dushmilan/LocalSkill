const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define the user schema
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true } 
);


    

// Pre-save hook to hash the password before saving the user
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); 
    try {
        const salt = await bcrypt.genSalt(10); 
        this.password = await bcrypt.hash(this.password, salt); 
        next();
    } catch (error) {
        next(error);
    }
});

// Static method to register a new user
userSchema.statics.register = async function (userData) {
    try {
        const user = new this(userData); 
        await user.save(); 
        return user;
    } catch (error) {
        throw error;
    }
};

// Method to find user by email
userSchema.statics.findByEmail = async function (email) {
    try {
        const user = await this.findOne({ email });
        return user;
    } catch (error) {
        throw error;
    }
};

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password); 
    } catch (error) {
        throw error;
    }
};



// Create the User model
const User = mongoose.model("User", userSchema);

module.exports = User;