var log4js = require('log4js');

log4js.configure({
    appenders: {
        multi: {
            type: 'multiFile',
            base: 'logs/',
            property: 'categoryName',
            extension: '.log',
            maxLogSize: 20971520,
            layout: { type: 'basic', separator: ', DBLog Error: ' }
        }
    },
    categories: {
        default: { appenders: ['multi'], level: 'debug' }
    }
});

exports.logger = function (file) {
    return log4js.getLogger(file);
};