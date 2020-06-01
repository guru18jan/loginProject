const NodeRSA = require('node-rsa');
const key = new NodeRSA({ b: 512 });
//response 
const resMessage = require('./response');


module.exports = {
    // Encrypt key
    encryptKey: (enKey) => {
        return key.encrypt(enKey, 'base64');
    },
    // Decrypt key
    decryptKey: (deKey) => {
        return key.decrypt(deKey, 'utf8');
    },

}