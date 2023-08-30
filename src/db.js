const mongose = require('mongoose');
require('dotenv').config()

const { DBMONGOOSE } = process.env

module.exports = ()=> {
    mongose.connect(
        DBMONGOOSE
    ).catch((e)=> console.log('error connection DB', e))
}