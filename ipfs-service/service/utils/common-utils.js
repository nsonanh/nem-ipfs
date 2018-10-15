//==============================================================================
// COMMON UTILS
//==============================================================================

//==============================================================================
// FUNCTIONS TO EXPORT
//==============================================================================

function sendResponse(res, code, message, error)
{
  return res
  .status(code)
  .json({
       'message': message,
       'error': error,
  });
}

module.exports = {
  sendResponse: sendResponse
};