const userModel = require("../models/userModel.js");

const userController = {
    signup: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            const user = userModel.register({
                name,
                email,
                password
            });
            await user.save();
            res.status(201).json({ message: "User created successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await userModel.findOne({ email });
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            const isPasswordValid = await user.comparePassword(password);
            if (!isPasswordValid) {
                return res.status(401).json({ error: "Invalid password" });
            }
            res.status(200).json({ message: "Login successful" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = userController;