require('dotenv').config();
const Users = require('../db/models');
const jwt = require('jsonwebtoken');
const path = require('path');


const handleSignUp = async (req, res) => {
    const { fname, lname, email, password, streetAddress, city, state, zip } = req.body;
    if (!fname || !lname || !email || !password || !streetAddress || !city || !state || !zip) {
        return res.status(401).json({ message: 'Please fill out all fields' });
    }
    // check for duplicates in db

    const duplicate = await Users.findOne({
        where: {
            email
        }
    })
    if (duplicate) {
        return res.sendStatus(409)
    }
    try {
        // encrypt the password
        const hashedPwd = await bcrypt.hash(password, SALT_ROUNDS);
        // store new user
        await Users.create({
            fname,
            lname,
            email,
            password: hashedPwd,
            streetAddress,
            city,
            state,
            zip
        });
        const createdUser = await Users.findOne({
            where: {
                fname,
                lname,
                email,
                password: hashedPwd,
                streetAddress,
                city,
                state,
                zip
            }
        })
        res.status(201).json({ message: `Thanks for signing up ${createdUser.fname}!` })
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
};

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    const foundUser = await Users.findOne({
        where: {
            email
        }
    })
    if (!foundUser) {
        console.log('no found user')
        return res.sendStatus(401) // 401 = unauthorized
    }
    // evaluate password
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        // create JWT
        const accessToken = jwt.sign(
            { email: foundUser.email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        )

        const refreshToken = jwt.sign(
            { email: foundUser.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        )
        foundUser.refreshToken = refreshToken;
        await foundUser.save();
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true, // set to true if using HTTPS
            maxAge: 24 * 60 * 60 * 1000, // set to desired expiry time
        });

        return res.json({ accessToken });
    } else {
        return res.sendStatus(401);
    }

}

module.exports = {
    handleSignUp,
    handleLogin
}