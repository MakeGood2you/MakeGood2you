const router = require('express').Router({mergeParams:true})


router.use('/users', require('./authentication'));

module.exports = router;
// exports.items = require('./items');
// exports.users = require('./authentication');
// exports.items = require('./items');
