const logger = require('./logger-obj');
const loggerFn = require('./logger-func');
const loggerCn = require('./logger-cons');
const loggerCl = require('./logger-class');


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