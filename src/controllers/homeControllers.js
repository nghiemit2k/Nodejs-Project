const connection = require('../config/database');
const { getAllUsers, getUserById, updateUserById, deleteUserById } = require('../services/CRUDService');
const { name } = require("ejs")
const User = require("../models/User")

const getHomepage = async (req, res) => {
    let results = await User.find({});
    // console.log('check rows',results)
    return res.render('home.ejs', { listUsers: results })
}

const postCreateUser = async (req, res) => {
    // let {email,name,city} = req.body
    let email = req.body.email;
    let myname = req.body.myname;
    let city = req.body.city;

    // let [results, fields] = await connection.query(
    //     `INSERT INTO Users (email,name,city) VALUES (?,?,?)`, [email, myname, city]
    // );
    await User.create({
        email,
        myname,
        city
    })
    res.send("Created user success");
}


const getCreatePage = (req, res) => {
    res.render('create.ejs')
}

const getUpdatePage = async (req, res) => {

    const userId = req.params.id;
    // let user = await getUserById(userId)
    let user = await User.findById(userId).exec();
    res.render('edit.ejs', { userEdit: user });
}

const postUpdateUser = async (req, res) => {
    // let {email,name,city} = req.body
    let email = req.body.email;
    let myname = req.body.myname;
    let city = req.body.city;
    let userId = req.body.userId;
    // await updateUserById(email, city, myname, userId)
    await User.updateOne({_id: userId}, {email: email, myname: myname, city: city});
    res.redirect('/');

}


const postDeleteUser = async (req, res) => {
    const userId = req.params.id;
    // let user = await getUserById(userId)
    let user = await User.findById(userId).exec();
    res.render('delete.ejs', { userEdit: user })
}


const postHandleRemoveUser = async (req, res) => {
    const id = req.body.userId;

    // await deleteUserById(id)
    await User.deleteOne({
        _id: id
    })
    res.redirect('/');
}

module.exports = {
    getHomepage, postCreateUser, getCreatePage,
    getUpdatePage, postUpdateUser, postDeleteUser, postHandleRemoveUser
}