const router = require('express').Router({mergeParams:true})


router.use('/users', require('./authentication'));

module.exports = router;
