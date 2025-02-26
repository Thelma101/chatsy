import User from '../models/user.model.js'
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
    try {
        const { fullname, username, password, confirmPassword, gender } = req.body;

        if (password != confirmPassword) {
            return res.send({ error: 'Passwords do not match' })
        }

        const user = await User.findOne({ username });

        if (user) {
            return res.send({ error: 'User already exists' })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            fullname,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === 'male' ? boyProfilePic : girlProfilePic,
        })
        await newUser.save();
        res.status(201).json({
            message: 'User created successfully',
            success: true,
            message: 'User created successfully',
            user: {
                _id: newUser._id,
                fullname: newUser.fullname,
                username: newUser.username,
                profilePic: newUser.profilePic
            }
        });
    } catch (error) {
        console.log('loginuser')
        return res.status(500).json({
            success: false,
            message: 'Error creating user',
            error: error.message
        })
    }
}

export const login = (req, res) => {
    res.send('login user')
}

export const logout = (req, res) => {
    res.send('logout user')
}