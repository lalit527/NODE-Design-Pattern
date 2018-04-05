const logger = require('./logger-obj');
const loggerFn = require('./logger-func');
const loggerCn = require('./logger-cons');
const loggerCl = require('./logger-class');
const loggerIn = require('./logger-inst');


logger.info("This is Info");
logger.verbose("This is Info");

loggerFn("A function export");
loggerFn.verbose("A Object export");

const dbLogger = new loggerCn("DB");
dbLogger.info('This is an informational message');

const accessLogger = new loggerCn("ACCESS");
accessLogger.verbose('This is an verbose message');

const dbLoggerCl = new loggerCl("DB");
dbLoggerCl.info('This is an informational message');

const accessLoggerCl = new loggerCl("ACCESS");
accessLoggerCl.verbose('This is an verbose message');

loggerIn.log("Hey There");

const customLogger = new loggerIn.logger('CUSTOM');
customLogger.log('This is an informational message');

require('./patcher'); //patcher must be require before looger, for first time patch to work
//const loggerPat = require('./logger-obj'); //Even if we require again, no error will come. It will use the cached file.
logger.customMessage();