const { check, validationResult } = require('express-validator');
const resMessage = require('../helper/response');

//validation for User register
register = [
    // console.log(check),
    check(['email'])
        .exists().withMessage('Email address is required.')
        .isEmail().withMessage('Email address is not valid.')
        .trim(),
    check('role')
        .exists().withMessage('Role is required.')
        .isAlpha().withMessage('Role should be alphabets')
        .isIn(['A' , 'U']).withMessage('Role is not valid.')    //A-> admin , U -> User
        .trim(),
    check('name')
        .exists().withMessage('Name is required.')
        .matches(/^[a-zA-z]+([\s][a-zA-Z]+)*$/,'g').withMessage('Name should be alphabets')
        .trim(),    
    check('phone')
        .exists().withMessage('Phone number is required.')
        .isNumeric().withMessage('Phone number should be Numeric')
        .isLength({ min: 10, max: 10 }).withMessage('Phone number should not be empty, should be equal to 10 digits')
        .trim(),
    check('password')
        .exists().withMessage('Password is required.')
        .isAlphanumeric().withMessage('Password should be aplhanumberic.')
        .isLength({ min: 5, max: 10 }).withMessage('Password should not be empty, should be equal to 5 to 10 digits')
        .trim(),
        function (req, res, next) {
            var errorValidation = validationResult(req);
            if (errorValidation.errors.length > 0) {
                console.log(`User register validation error message :- ${errorValidation.errors[0].msg}`)
                return res.send(resMessage.Error500(`${errorValidation.errors[0].msg}`));
            }
            next()
        }
];

//validation for User login
login = [
    check(['email'])
        .exists().withMessage('Email address is required.')
        .isEmail().withMessage('Email address is not valid.')
        .trim(),
    check('password')
        .exists().withMessage('Password is required.')
        .trim(),
        function (req, res, next) {
            var errorValidation = validationResult(req);
            if (errorValidation.errors.length > 0) {
                console.log(`User login validation error message :- ${errorValidation.errors[0].msg}`)
                return res.send(resMessage.Error500(`${errorValidation.errors[0].msg}`));
            }
            next()
        }
];

//validation for get user profile
getProfile = [
    check(['email'])
        .exists().withMessage('Email address is required.')
        .isEmail().withMessage('Email address is not valid.')
        .trim(),
        function (req, res, next) {
            var errorValidation = validationResult(req);
            if (errorValidation.errors.length > 0) {
                console.log(`User login validation error message :- ${errorValidation.errors[0].msg}`)
                return res.send(resMessage.Error500(`${errorValidation.errors[0].msg}`));
            }
            next()
        }
];
module.exports = {
    register,
    login,
    getProfile
}