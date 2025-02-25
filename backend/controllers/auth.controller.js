export const signup = async (req, res) => {
    try {
        const {fullname, username, password, confirmPassword, gender} = req.body;
    
        if (password != confirmPassword) {
            return res.send({error: 'Passwords do not match'})
        }

        const user = await User.findOne({username});

        if (user) {
            return res.send({error: 'User already exists'})
        }

         const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
         const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User.create({
            fullname,
            username,
            password,
            gender,
            profilePic: gender === 'male' ? boyProfilePic : girlProfilePic,
        })
            await newUser.save();
            return res.send()
    } catch (error){
        res.send(error)
    }
}

export const login = (req, res) => {
    res.send('login user')
}

export const logout = (req, res) => {
    res.send('logout user')
}