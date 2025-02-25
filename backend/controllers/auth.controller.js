export const signup = async (req, res) => {
    try {
        const {fullname, username, password, confirmPassword, gender} = req.body;
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