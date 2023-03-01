const { Users } = require('../db');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
require('dotenv').config();
const path = require('path');

const handleLogin = async (req, res) => {
    console.log('handleLogin function, TOP OF FUNCTION');
    const { email, password } = req.body;
    if (!email || !password){
        console.log('handleLogin function, EITHER NO EMAIL OR NO PASSWORD');
        console.log('REQ.BODY: ', req.body);
        return res.status(400).json({ 'message': 'Username and password are required.' });
    }
    const foundUser = await Users.findOne({
        where: {
            email
        }
    });
    if (!foundUser){
        console.log('handleLogin function, NO FOUND USER');
        return res.sendStatus(401);
     }
    // evaluate password 
    try{
        console.log('handleLogin function, TOP OF INSIDE OF TRY BRACKET')
        const match = await bcrypt.compare(password, foundUser.password);
        if (match) {
            // create JWTs
            const accessToken = jwt.sign(
                { email: foundUser.email },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '20m' }
            );
            const refreshToken = jwt.sign(
                { email: foundUser.email },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            );
            // Saving refreshToken with current user
            foundUser.refreshToken = refreshToken
            // const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username);
            // const currentUser = { ...foundUser, refreshToken };
            // usersDB.setUsers([...otherUsers, currentUser]);
            // await fsPromises.writeFile(
            //     path.join(__dirname, '..', 'model', 'users.json'),
            //     JSON.stringify(usersDB.users)
            // );
            await foundUser.save();
            res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
            res.json({ accessToken });
        } else {
            console.log('handleLogin function, INSIDE TRY, IN ELSE STATEMENT');
            res.sendStatus(401);
        }
    } catch(e){
        console.log('handleLogin function ERROR IN CATCH: ', e);
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };