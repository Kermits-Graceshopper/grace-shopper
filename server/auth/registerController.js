const { Users } = require('../db')
const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ "message": "Username and password are required.", "req.body": req.body  });
    }
    // check for duplicate usernames in the db
    const duplicate = await Users.findOne({
        where: {
            email
        }
    });
    if (duplicate) return res.sendStatus(409); //Conflict 
    try {
        console.log('top of try bracket')
        //encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10);
        console.log('above Users.create()');
        await Users.create({
            email: email,
            password: hashedPwd
        })
        console.log('below Users.create()');
        //store the new user
        // const newUser = { "username": user, "password": hashedPwd };
        // usersDB.setUsers([...usersDB.users, newUser]);
        // await fsPromises.writeFile(
        //     path.join(__dirname, '..', 'model', 'users.json'),
        //     JSON.stringify(usersDB.users)
        // );
        // console.log(usersDB.users);
        res.status(201).json({ "success": `New user created, welcome!`})
    } catch (err) {
        console.log('error in catch');
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };