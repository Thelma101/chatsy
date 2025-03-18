import generateTokenAndSetCookie from '../../utils/generateToken.js';
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
        });

        if (newUser) {
            generateTokenAndSetCookie(newUser.id, res)
            await newUser.save();

            res.status(201).json({
                success: true,
                message: 'User created successfully',
                user: {
                    _id: newUser._id,
                    fullname: newUser.fullname,
                    username: newUser.username,
                    profilePic: newUser.profilePic,
                }
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'User not created: Invalid user data',
            });
        }
    } catch (error) {
        console.log('create user failed')
        return res.status(500).json({
            success: false,
            message: 'Error creating user',
            error: error.message,
            errorMessage: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString(),
        })
    }
}


export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
        if (!user || !isPasswordCorrect) {
            return res.status(400).json({
                success: false,
                message: 'Invalid username or password',
                stack: error.stack
            })
        } else {
            generateTokenAndSetCookie(user._id, res);

            res.status(200).json({
                success: true,
                message: 'User logged in successfully',
                user: {
                    _id: user._id,
                    fullname: user.fullname,
                    username: user.username,
                    profilePic: user.profilePic,
                }
            })
        }
    } catch (error) {
        console.log('login user failed')
        return res.status(500).json({
            success: false,
            message: 'User cannot login',
            error: error.message,
            stack: error.stack,
        })
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge:0});
        res.status(200).json({
            success: true,
            message: 'User logged out successfully',
        })
    } catch (error) {
        console.log('Error in logout controller', error.message)
        return res.status(500).json({
            success: false,
            message: 'Error in logout controller',
            stack: error.stack,
        });
    }
}