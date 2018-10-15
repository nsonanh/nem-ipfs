//==============================================================================
//
// Service file.
// Son Nguyen
//==============================================================================

//==============================================================================
// BASE SETUP
//==============================================================================

// Call packages
const express         = require('express')                // express
const service         = express()                         // express
const bodyParser      = require('body-parser')            // body parser
const config          = require('./config/config.js');    // config
const cors            = require('cors')({origin: true});
const cookieParser    = require('cookie-parser');
const path            = require('path');

// Call routes
const uploadRoute     = require('./routes/upload.js');

// Service port
const port = process.env.PORT || 8181;

// Set the bodyParser to parse the urlencoded post data
service.use(cookieParser());
service.use(bodyParser.json());
service.use(bodyParser.urlencoded({ extended: true }));
service.use(express.static(path.join(__dirname, 'public')));

service.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers',
   'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

//==============================================================================
// ROUTES FOR SERVICES
//==============================================================================

// Get an instance of the express Router
const router = express.Router();

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
const server = service.listen(port, () => {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Server listening at http://%s:%s", host, port);
});
