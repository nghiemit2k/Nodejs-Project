const express = require('express');
const routerAPI = express.Router();
const { getUsersAPI, postCreateUserAPI, putUpdateUserAPI,deleteUserAPI } = require('../controllers/apiControllers')



routerAPI.get('/users', getUsersAPI)

routerAPI.post('/users', postCreateUserAPI)
routerAPI.put('/users', putUpdateUserAPI)
routerAPI.delete('/users', deleteUserAPI)


module.exports = routerAPI;