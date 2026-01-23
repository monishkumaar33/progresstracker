const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { adduser, getUserByEmail } = require('../service/userservice');

const postuser = async(req,res)=>
{
    try {
        const user = req.body;
        if (!user.username || !user.email || !user.password) {
            return res.status(400).send("Username, email, and password are required.");
        }
        const hashedpassword = bcrypt.hashSync(user.password, 10);
        if (await adduser(user, hashedpassword)) {
            return res.status(201).send("User added successfully.");
        }
        return res.status(400).send("Error adding user.");
    } catch (err) {
        return res.status(500).send("Server error: " + err.message);
    }
}

const loginuser = async(req,res)=>
{
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send("Email and password are required.");
        }
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(401).send("Invalid email or password.");
        }
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(401).send("Invalid email or password.");
        }
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'your_secret_key', { expiresIn: '1h' });
        return res.status(200).json({ message: "Login successful", token: token });
    } catch (err) {
        return res.status(500).send("Server error: " + err.message);
    }
}

module.exports = { postuser, loginuser };