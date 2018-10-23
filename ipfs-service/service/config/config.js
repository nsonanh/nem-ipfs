var config = {};

//==============================================================================
// ROUTE PATHS FOR SERVICE
//==============================================================================
config.routePaths = {
  prefix  : '/ipfs',
  upload  : '/upload'
};

//==============================================================================
// CONFIG FOR IPFS
//==============================================================================
config.ipfs = {
  MAX_SIZE : 52428800,
  host: '127.0.0.1',
  port: 5001,
  protocol: 'http'
};

module.exports = config;
