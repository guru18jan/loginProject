const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Config = require('../helper/config');
const Helper = require('../helper/helper');

//models
const Record = require('../models/Record');
const Detail = require('../models/Detail');
//response 
const resMessage = require('../helper/response');

module.exports = {

  /*
  *=============================================================================
  *Name: Record registration
  *=============================================================================
  * @route => /register
  * @method => post
  * @params=>  name,password,email,role
  */
  register: (req, res) => {
    Record.findOne({ email: req.body.email })
      .then(success => {
        if (success) return res.send(resMessage.Error409('Record'));
        else {
          //for Encrypt password
          req.body.password = bcrypt.hashSync(req.body.password);
          // generate encrypt user token
          req.body.userToken = Helper.encryptKey(req.body.email);
          //Insert in Database
          Record.create(req.body)
            .then(async (createSuccess) => {
              if (createSuccess) {
                return res.send(resMessage.success200('Record created successfully.'));
              }
              else {
                return res.send(resMessage.Error404);
              }
            })
            .catch(createErr => {
              console.log(`register error :- ${createErr}`);
              return res.send(resMessage.Error500());
            })
        }
      })
      .catch(err => {
        console.log(`find error :- ${err}`);
        return res.send(resMessage.Error500());
      })
  },


  /*
  *=============================================================================
  *Name: Record Login
  *=============================================================================
  * @route => /login
  * @method => GET
  * @params => email, password
  */
  login: (req, res) => {
    Record.findOne({ email: req.body.email })
      .then(success => {
        if (!success) return res.send(resMessage.Error401);
        else {
          bcrypt.compare(req.body.password, success.password, async (err, match) => {
            if (err) return res.send(resMessage.Error500());
            if (!match) return res.send(resMessage.Error500('Please provide email and password.'));
            else {
              let jwtObj = {
                name: success['name'],
                phone: success['phone'],
                cmail: success['email']
              }
              let jwtToken = await jwt.sign({ jwtObj }, Config.jwtKey, "");
              res.header("authorization", [jwtToken]);
              let resObj = {
                name: success.name,
                email: success.companyEmail,
                role: success.role,
                authorization: jwtToken
              }
              return res.send(resMessage.success200("Login Successful.", resObj));
            }
          });
        }
      })
      .catch(err => {
        console.log(`find error :- ${err}`);
        return res.send(resMessage.Error500());
      })
  },


  /*
  *=============================================================================
  *Name: GET PROFILE
  *=============================================================================
  * @route => /getProfile
  * @method => GET
  * @params => email
  */
  getProfile: (req, res) => {
    Record.findOne({ email: req.body.email },{_id:0,userToken:0,password:0})
      .then(success => {
        if (!success) return res.send(resMessage.Error401);
        else return res.send(resMessage.success200("Login Successful.", success));
      })
      .catch(err => {
        console.log(`find error :- ${err}`);
        return res.send(resMessage.Error500());
      })
  },


  /*
  *=============================================================================
  *Name: details
  *=============================================================================
  * @route => /getRecordDetail
  * @method => GET
  * @params => role
  */
 getRecordDetail: (req, res) => {
    Detail.find({ role : req.body.role })
      .then(success => {
        if (!success) return res.send(resMessage.Error404);
        else return res.send(resMessage.success200(`Data fetch successfully.`, success));
      })
      .catch(err => {
        console.log(`find error :- ${err}`);
        return res.send(resMessage.Error500());
      })
  }


}