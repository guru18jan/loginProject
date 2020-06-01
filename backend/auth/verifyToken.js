const jwt = require('jsonwebtoken');
const config = require('../helper/config');
const resMessage = require('../helper/response');

module.exports = {
    verifyToken: verifyToken
}
/**
 * Name:verifyToken
 * Desc: This function help to verify token for valid users.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

async function verifyToken(req, res, next) {
    const token = req.header('authorization');
    if (!token) return res.send(resMessage.Error401('Access Denied.Authenticate token '));
    try {
        const decoded = jwt.verify(token, config.jwtKey);
        req.user = decoded;
        next();
    } catch (ex) {
        return res.send(resMessage.Error401());
    }
}