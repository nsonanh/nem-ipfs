//==============================================================================
//
// Service file.
// Son Nguyen
//==============================================================================

//==============================================================================
// BASE SETUP
//==============================================================================

// Call packages
let express         = require('express')                // express
let service         = express()                         // express
let bodyParser      = require('body-parser')            // body parser
let config          = require('./config/config.js');    // config
let cors            = require('cors')({origin: true});

// Call routes
let uploadRoute     = require('./routes/upload.js');

// Service port
let port = process.env.PORT || 8080;

// Set the bodyParser to parse the urlencoded post data
service.use(bodyParser.urlencoded({ extended: true }));

//==============================================================================
// ROUTES FOR SERVICES
//==============================================================================

// Get an instance of the express Router
let router = express.Router();

// Routes
// Default route
router.get('/', (req, res) => {
    res.json({
        message: 'Home'
    });
});
// Routes for uploading to IPFS
router.use(uploadRoute);

// App's middleware usage
service.use(cors);
service.use(config.routePaths.prefix, router); // Route prefix

//==============================================================================
// START THE SERVER
//==============================================================================
let server = service.listen(port, () => {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Server listening at http://%s:%s", host, port);
});
