var rest = require('./rest');
var cron = require('./cron');

rest.runServer();
cron.startJobs();