
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const createToken = async (_id, role) => {
    return jwt.sign({ _id, role }, process.env.SECRET, {
        expiresIn: '1d'
    })
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const role = user.role;
        const token = await createToken(user._id, user.role);
        res.status(200).json({ token, role, username: user.username, email });
    } catch (error) {
        res.status(403).json({ error: error.message });
    }
};

const registerUser =  async(req,res) => {
    const {email , username , password , role } = req.body
    
    try {
        
        const hash = await User.signup(email , password , username )

        const user = await User.create({
            email , password : hash , username , role
        })

        const token = await createToken(user._id , role)

        res.status(201).json({
            username , role , token
        })

    } catch (error) {
        res.status(400).json({error : error.message})
    }
}

module.exports = { loginUser , registerUser}