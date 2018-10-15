//==============================================================================
// UPLOAD ROUTE
//==============================================================================
let express       = require('express');   // call express
let router        = express.Router();     // get an instance of the express Router
let config        = require('../config/config.js');

//==============================================================================
// FUNCTIONS TO EXPORT
//==============================================================================
router.post(config.routePaths.upload, function(req, res) {
});

module.exports = router;
