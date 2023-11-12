const User = require("../models/User")

const getUsersAPI = async (req, res) => {
    let results = await User.find({});

    return res.status(200).json({
        errorCode: 0,
        data: results
    })
}

const postCreateUserAPI = async (req, res) => {
    // let {email,name,city} = req.body
    let email = req.body.email;
    let myname = req.body.myname;
    let city = req.body.city;

    // let [results, fields] = await connection.query(
    //     `INSERT INTO Users (email,name,city) VALUES (?,?,?)`, [email, myname, city]
    // );
    let user = await User.create({
        email,
        myname,
        city
    })
    return res.status(200).json({
        errorCode: 0,
        data: user
    })
}

const putUpdateUserAPI = async (req, res) => {
    // let {email,name,city} = req.body
    let email = req.body.email;
    let myname = req.body.myname;
    let city = req.body.city;
    let userId = req.body.userId;
    // await updateUserById(email, city, myname, userId)
    let user = await User.updateOne({ _id: userId }, { email: email, myname: myname, city: city });
    return res.status(200).json({
        errorCode: 0,
        data: user
    })

}
const deleteUserAPI = async (req, res) => {
    const id = req.body.userId;

    // await deleteUserById(id)
    let user = await User.deleteOne({
        _id: id
    })
    return res.status(200).json({
        errorCode: 0,
        data: user
    })
}
module.exports = {
    getUsersAPI, postCreateUserAPI, putUpdateUserAPI, deleteUserAPI
}