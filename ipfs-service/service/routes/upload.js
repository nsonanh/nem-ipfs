//==============================================================================
// UPLOAD ROUTE
//==============================================================================
const ipfsAPI   = require('ipfs-api');
const multer    = require('multer');
const path      = require('path');
const fs        = require('fs');

const express   = require('express');   // call express
const router    = express.Router();     // get an instance of the express Router
const config    = require('../config/config.js');
const utils     = require('../utils/common-utils.js');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.${file.mimetype.split('/')[1]}`);
  },
});

const upload = multer({ storage });

const ipfs = ipfsAPI({
  host      : config.ipfs.host,
  port      : config.ipfs.port,
  protocol  : config.ipfs.protocol
});

//==============================================================================
// FUNCTIONS TO EXPORT
//==============================================================================
router.post(config.routePaths.upload, upload.single('file'), (req, res) =>
{
  if (!req.file) {
    return utils.sendResponse(res, 422,
      'Validation error', 'File needs to be provided.');
  }

  const mime = req.file.mimetype;
  if (mime.split('/')[0] !== 'image') {
    fs.unlink(req.file.path);
    return utils.sendResponse(res, 422,
      'Validation error', 'File needs to be an image.');
  }

  const fileSize = req.file.size;
  if (fileSize > config.ipfs.MAX_SIZE) {
    fs.unlink(req.file.path);
    return utils.sendResponse(res, 422,
       'Validation error', `Image needs to be smaller than ${MAX_SIZE} bytes.`);
  }

  const data = fs.readFileSync(req.file.path);
  return ipfs.add(data, (err, files) => {
    fs.unlink(req.file.path);
    if (files) {
      return res.json({
        hash: files[0].hash
      });
    }

    return res.status(500).json({
      error: err,
    });
  });
});

module.exports = router;
