const restify = require('restify');
const util = require('util');

function GenericError(data, errorCodeExplicit, statusCode) {
  if (data instanceof Error) {
    // eslint-disable-next-line no-console
    console.log(data);
  }

  let message;
  let errorCode = errorCodeExplicit || 0;
  if (typeof data === 'string' || data instanceof String) {
    message = data;
  } else if (data != null && data instanceof Object) {
    if (data.message) {
      message = data.message;
    } else {
      message = JSON.stringify(data);
    }
    if (data.code) {
      errorCode = data.code;
    }
  }

  restify.RestError.call(this, {
    statusCode: statusCode || 500,
    body: {
      code: errorCode || 0,
      error: true,
      message,
    },
    constructorOpt: GenericError,
  });
  this.name = 'GenericError';
}
util.inherits(GenericError, restify.RestError);
export default GenericError;
